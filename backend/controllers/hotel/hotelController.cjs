const asyncHandlerSync = require("express-async-handler");
const Hotel = require("../../models/hotel.model.cjs");
const User = require("../../models/user.models.cjs");

//  @desc       Get Hotel List
//  @route      Get /api/hotel/
//  @access     Private
const getHotels = asyncHandlerSync(async (req, res) => {
  const hotels = await Hotel.find({
    owner: req.user.id,
    // company: req.body.company,
  });
  res.status(200).json(hotels);
});

//  @desc       Get Hotel List
//  @route      Get /api/hotel/:id
//  @access     Private
const findMyHotel = asyncHandlerSync(async (req, res) => {
  const hotels = await Hotel.find({
    company: req.params.id,
  });
  res.status(200).json(hotels);
});

//  @desc       Get Hotel List
//  @route      Get /api/hotel/new
//  @access     Private
const createHotel = asyncHandlerSync(async (req, res) => {
  const {
    name,
    title,
    description,
    language,
    company,
    images,
    address,
    street,
    city,
    available,
    tags,
    total,
    price,
    guest,
    max_guest,
    bed,
    bedroom,
    bath,
    rating,
    review,
    rules,
    saftey,
    cancellation,
  } = req.body;

  if (
    (!name || !title || !description || !company || !price || !images, address)
  ) {
    res.status(400);
    throw new Error("Please fill required input fields");
  }

  const hasHotel = await Hotel.findOne({ owner: req.user.id, name, company });
  if (hasHotel) {
    res.status(400);
    throw new Error("Hotel already exists");
  }

  const hotel = await Hotel.create({
    owner: req.user.id,
    company,
    name,
    title,
    description,
    language,
    images,
    address,
    street,
    city,
    tags,
    room: {
      available,
      total,
    },
    price,
    accomodation: {
      guest,
      max_guest,
      bed,
      bedroom,
      bath,
    },
    rating,
    review,
    policy: {
      rules,
      saftey,
      cancellation,
    },
  });
  if (hotel) {
    res.status(201).json({
      _id: hotel.id,
      owner: hotel.owner,
      company: hotel.company,
      name: hotel.name,
      address: hotel.address,
      price: hotel.price,
    });
    console.log("New hotel data added!");
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//  @desc       Get Hotel List
//  @route      Get /api/hotel/:id/update
//  @access     Private
const updateHotel = asyncHandlerSync(async (req, res) => {
  const hasHotel = await Hotel.findById(req.params.id);
  if (!hasHotel) {
    res.status(400);
    throw new Error("Hotel not found");
  }

  const {
    name,
    title,
    description,
    language,
    images,
    address,
    street,
    city,
    available,
    tags,
    total,
    price,
    guest,
    max_guest,
    bed,
    bedroom,
    bath,
    rating,
    review,
    rules,
    saftey,
    cancellation,
  } = req.body;

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  if (hasHotel.owner.toString() !== user.id) {
    res.status(401);
    throw new Error("User not found");
  }

  const updateHotel = await Hotel.findByIdAndUpdate(
    req.params.id,
    {
      title,
      description,
      language,
      images,
      address,
      street,
      city,
      tags,
      room: {
        available,
        total,
      },
      price,
      accomodation: {
        guest,
        max_guest,
        bed,
        bedroom,
        bath,
      },
      rating,
      review,
      policy: {
        rules,
        saftey,
        cancellation,
      },
    },
    { new: true }
  );

  if (updateHotel) {
    res.status(201).json({
      _id: updateHotel.id,
      owner: updateHotel.owner,
      company: updateHotel.company,
      name: updateHotel.name,
      address: updateHotel.address,
      price: updateHotel.price,
    });
    console.log("New hotel data added!");
  } else {
    res.status(400);
    throw new Error("Invalid hotel data");
  }
});

//  @desc       Get Hotel List
//  @route      Get /api/hotel/:id/delete
//  @access     Private
const deleteHotel = asyncHandlerSync(async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);
  if (!hotel) {
    res.status(400);
    throw new Error("Hotel not found");
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  if (hotel.owner.toString() !== user.id) {
    res.status(401);
    throw new Error("User not found");
  }
  await Hotel.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: `Hotel(${req.params.id}) data deleted!` });
});

module.exports = {
  getHotels,
  createHotel,
  updateHotel,
  deleteHotel,
  findMyHotel,
};

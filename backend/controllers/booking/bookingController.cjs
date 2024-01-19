const asyncHandlerSync = require("express-async-handler");
const Booking = require("../../models/booking.model.cjs");
const Hotel = require("../../models/hotel.model.cjs");

//  @desc       Get Bookings List
//  @route      Get /api/booking/
//  @access     Private
const getBookings = asyncHandlerSync(async (req, res) => {
  const bookings = Booking.find();
  res.status(200).json(bookings);
});

//  @desc        Get Company Booking List
//  @route       Get /api/booking/mine
//  @access      Private
const getCompanyBookings = asyncHandlerSync(async (req, res) => {
  const bookings = Booking.find({ owner: req.params.id });
  res.status(200).json(bookings);
});

//  @desc        Create New Order
//  @route       POST /api/booking/new
//  @access      Private

const createOrder = asyncHandlerSync(async (req, res) => {
  const { hotel, checkIn, checkOut, days, guests, total, fee } = req.body;
  if ((!hotel, !checkIn, !checkOut, !days, !guests, !total, !fee)) {
    res.status(400);
    throw new Error("Please fill required input fields");
  }

  const hasOrder = await Booking.findOne({
    customer: req.user.id,
    hotel: hotel,
  });

  if (hasOrder) {
    res.status(400);
    throw new Error("Order already exists");
  }

  const order = await Booking.create({
    customer: req.user.id,
    hotel,
    checkIn,
    checkOut,
    days,
    guests,
    price: total,
    fee,
  });

  if (order) {
    res.status(201).json({
      _id: order.id,
      customer: order.customer,
      hotel: order.hotel,
      checkIn: order.checkIn,
      checkOut: order.checkOut,
      days: order.days,
      guests: order.guests,
      price: order.price,
      fee: order.fee,
    });
    console.log("New order data created");
  } else {
    res.status(400);
    throw new Error("Invalid order data");
  }
});

//  @desc        Get User Booking Order
//  @route       Get /api/booking/:id
//  @access      Private

const getOrder = asyncHandlerSync(async (req, res) => {
  const order = Booking.findOne({
    customer: req.user.id,
    hotel: req.params.id,
    validated: true,
  });
  res.status(200).json(order);
});

//  @desc        Update User Booking Order
//  @route       PUT /api/booking/:id
//  @access      Private

const updateOrder = asyncHandlerSync(async (req, res) => {
  const hasOrder = await Booking.findById(req.params.id);
  if (!hasOrder) {
    res.status(400);
    throw new Error("Order not found");
  }
  if (!req.user.id) {
    res.status(401);
    throw new Error("User not found");
  }

  const { checkIn, checkOut, days, guests, total, fee } = req.body;

  const updateOrder = await Booking.findByIdAndUpdate(req.params.id, {
    checkIn,
    checkOut,
    days,
    guests,
    price: total,
    fee,
  });

  if (updateOrder) {
    res.status(201).json({
      _id: updateOrder.id,
      customer: updateOrder.customer,
      hotel: updateOrder.hotel,
      checkIn: updateOrder.checkIn,
      checkOut: updateOrder.checkOut,
      days: updateOrder.days,
      guests: updateOrder.guests,
      price: updateOrder.price,
      fee: updateOrder.fee,
    });
    console.log("Order data updated");
  } else {
    res.status(400);
    throw new Error("Invalid hotel data");
  }
});

//  @desc        Delete User Booking Order
//  @route       DELETE /api/booking/:id
//  @access      Private

const deleteOrder = asyncHandlerSync(async (req, res) => {
  const hasOrder = await Booking.findById(req.params.id);
  if (!hasOrder) {
    res.status(400);
    throw new Error("Order not found");
  }
  if (!req.user.id) {
    res.status(401);
    throw new Error("User not found");
  }

  Booking.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json({ message: `Booking Order(${req.params.id}) data deleted!` });
});

//  @desc        Approve Booking Order
//  @route       PUT /api/booking/:id/approve
//  @access      Private

const approveOrder = asyncHandlerSync(async (req, res) => {
  const hasOrder = await Booking.findById(req.params.id);
  if (!hasOrder) {
    res.status(400);
    throw new Error("Order not found");
  }
  if (!req.user.id) {
    res.status(401);
    throw new Error("User not found");
  }
  const getHotel = await Hotel.findOne({
    owner: req.user.id,
    _id: hasOrder.hotel,
  });
  if (!getHotel) {
    res.status(401);
    throw new Error("Not valid admin");
  }
  const updateOrder = await Booking.findByIdAndUpdate(req.params.id, {
    approved: true,
  });

  if (updateOrder) {
    res.status(201).json({
      _id: updateOrder.id,
      customer: updateOrder.customer,
      hotel: updateOrder.hotel,
      checkIn: updateOrder.checkIn,
      checkOut: updateOrder.checkOut,
      days: updateOrder.days,
      guests: updateOrder.guests,
      price: updateOrder.price,
      fee: updateOrder.fee,
      approved: updateOrder.approved
    });
    console.log("Order data updated");
  } else {
    res.status(400);
    throw new Error("Invalid hotel data");
  }
});

//  @desc        Reject Booking Order
//  @route       PUT /api/booking/:id/reject
//  @access      Private

const declineOrder = asyncHandlerSync(async (req, res) => {
  const hasOrder = await Booking.findById(req.params.id);
  if (!hasOrder) {
    res.status(400);
    throw new Error("Order not found");
  }
  if (!req.user.id) {
    res.status(401);
    throw new Error("User not found");
  }
  const getHotel = await Hotel.findOne({
    owner: req.user.id,
    _id: hasOrder.hotel,
  });
  if (!getHotel) {
    res.status(401);
    throw new Error("Not valid admin");
  }
  const updateOrder = await Booking.findByIdAndUpdate(req.params.id, {
    validated: false,
    approved: false,
  });

  if (updateOrder) {
    res.status(201).json({
      _id: updateOrder.id,
      customer: updateOrder.customer,
      hotel: updateOrder.hotel,
      checkIn: updateOrder.checkIn,
      checkOut: updateOrder.checkOut,
      days: updateOrder.days,
      guests: updateOrder.guests,
      price: updateOrder.price,
      fee: updateOrder.fee,
    });
    console.log("Order data updated");
  } else {
    res.status(400);
    throw new Error("Invalid hotel data");
  }
});

module.exports = {
  getBookings,
  getCompanyBookings,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  approveOrder,
  declineOrder,
};

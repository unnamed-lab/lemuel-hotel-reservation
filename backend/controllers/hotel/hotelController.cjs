const asyncHandlerSync = require("express-async-handler");
const Hotel = require("../../models/hotel.model.cjs");

//  @desc       Get Hotel List
//  @route      Get /api/hotel/
//  @access     Private
const getHotels = asyncHandlerSync(async (req, res) => {
  const hotels = await Hotel.find();
  res.status(200).json(hotels);
});

//  @desc       Get Hotel List
//  @route      Get /api/hotel/new
//  @access     Private
const createHotel = asyncHandlerSync(async (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: `Set request!` });
});

//  @desc       Get Hotel List
//  @route      Get /api/hotel/:id/update
//  @access     Private
const updateHotel = asyncHandlerSync(async (req, res) => {
  res.status(200).json({ message: `Update request ${req.params.id}!` });
});

//  @desc       Get Hotel List
//  @route      Get /api/hotel/:id/delete
//  @access     Private
const deleteHotel = asyncHandlerSync(async (req, res) => {
  res.status(200).json({ message: `Delete request ${req.params.id}!` });
});

module.exports = { getHotels, createHotel, updateHotel, deleteHotel };

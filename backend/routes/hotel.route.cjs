const express = require("express");
const router = express.Router();
const {
  getHotels,
  createHotel,
  updateHotel,
  deleteHotel,
  findMyHotel,
} = require("../controllers/hotel/hotelController.cjs");

const { protect } = require("../middleware/authMiddleware.cjs");

router.route("/").get(protect, getHotels);

router.route("/:id").get(findMyHotel);

router.route("/new").post(protect, createHotel);

router.route("/:id/update").put(protect, updateHotel);

router.route("/:id/delete").delete(protect, deleteHotel);

module.exports = router;

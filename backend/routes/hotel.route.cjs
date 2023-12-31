const express = require("express");
const router = express.Router();
const {
  getHotels,
  createHotel,
  updateHotel,
  deleteHotel,
} = require("../controllers/hotel/hotelController.cjs");

router.route("/").get(getHotels);

router.route("/new").post(createHotel);

router.route("/:id/update").put(updateHotel);

router.route("/:id/delete").delete(deleteHotel);

module.exports = router;

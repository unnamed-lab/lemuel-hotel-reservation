const express = require("express");
const router = express.Router();
const {
  getBookings,
  getCompanyBookings,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  approveOrder,
  declineOrder,
} = require("../controllers/booking/bookingController.cjs");
const { protect, orderAccess } = require("../middleware/authMiddleware.cjs");

// Get all bookings from the database
router.route("/").get(getBookings);

// Get all bookings of a company
router.route("/mine/:id").get(protect, getCompanyBookings);

// Create a new booking order
router.route("/new").post(protect, createOrder);

// Get a booking order
router.route("/:id").get(protect, getOrder);

// Update a booking order
router.route("/:id").put(protect, updateOrder);

// Approve booking order
router.route("/:id/approve").put(orderAccess, approveOrder);

// Reject booking order
router.route("/:id/reject").put(orderAccess, declineOrder);

// Deletes a booking order
router.route("/:id/delete").delete(protect, deleteOrder);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  createUser,
  updateUser,
  deleteUser,
  getMe,
  loginUser,
} = require("../controllers/user/userController.cjs");
const { protect } = require("../middleware/authMiddleware.cjs");

router.route("/me").get(protect, getMe);

router.route("/").post(createUser);

router.route("/login").post(loginUser);

router.route("/:id/update").put(protect, updateUser);

router.route("/:id/delete").delete(protect, deleteUser);

module.exports = router;

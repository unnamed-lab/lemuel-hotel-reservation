const express = require('express');
const router = express.Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user/userController.cjs");

router.route("/").get(getUsers)

router.route("/").post(createUser)

router.route("/:id/update").put(updateUser)

router.route("/:id/delete").delete(deleteUser);

module.exports = router;
const asyncHandlerSync = require("express-async-handler");

//  @desc       Get User List
//  @route      Get /api/user/
//  @access     Private
const getUsers = asyncHandlerSync(async (req, res) => {
  res.status(200).json({ message: `Get request!` });
});

//  @desc       Get User List
//  @route      Get /api/user/
//  @access     Private
const createUser = asyncHandlerSync(async (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: `Set request!` });
});

//  @desc       Get User List
//  @route      Get /api/user/:id/update
//  @access     Private
const updateUser = asyncHandlerSync(async (req, res) => {
  res.status(200).json({ message: `Update request ${req.params.id}!` });
});

//  @desc       Get User List
//  @route      Get /api/user/:id/delete
//  @access     Private
const deleteUser = asyncHandlerSync(async (req, res) => {
  res.status(200).json({ message: `Delete request ${req.params.id}!` });
});

module.exports = { getUsers, createUser, updateUser, deleteUser };

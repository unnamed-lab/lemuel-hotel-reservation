const asyncHandlerSync = require("express-async-handler");
const User = require("../../models/user.models.cjs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//  @desc       Get User List
//  @route      Get /api/user/me
//  @access     Private
const getMe = asyncHandlerSync(async (req, res) => {
  const { _id, username, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    username,
    email,
  });
});

//  @desc       Create/Register User
//  @route      POST /api/user/
//  @access     Public
const createUser = asyncHandlerSync(async (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;

  // Checks if the input fields are filled
  if (!username || !firstname || !lastname || !email || !password) {
    res.status(400);
    throw new Error("Please add all field.");
  }

  // Check if the user exists
  const hasUser = await User.findOne({ email });
  if (hasUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPwd = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    username,
    email,
    firstname,
    lastname,
    password: hashedPwd,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
    console.log("New user data added!");
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//  @desc       Authenticate User
//  @route      POST /api/user/login
//  @access     Public
const loginUser = asyncHandlerSync(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//  @desc       Update User
//  @route      PUT /api/user/:id/update
//  @access     Private
const updateUser = asyncHandlerSync(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const { username, firstname, lastname, email, password } = req.body;

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPwd = await bcrypt.hash(password, salt);

  const updateUser = await User.findByIdAndUpdate(
    req.user.id,
    { username, firstname, lastname, email, password: hashedPwd },
    { new: true }
  );
  if (updateUser) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  }
});

//  @desc       Delete User
//  @route      DELETE /api/user/:id/delete
//  @access     Private
const deleteUser = asyncHandlerSync(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: `User(${req.params.id}) data deleted!` });
});

// Generate a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getMe,
  loginUser,
};

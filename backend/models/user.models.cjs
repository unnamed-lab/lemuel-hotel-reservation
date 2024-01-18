const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a unique username"],
      minLength: 6,
      lowercase: true,
      unique: true,
    },
    email: { type: String, required: true, lowercase: true },
    firstname: { type: String, required: [true, "Please add your firstname"] },
    lastname: { type: String, required: [true, "Please add your lastname"] },
    password: { type: String, required: [true, "Please add a password"] },
    premium: { type: Boolean, default: false },
    business: { type: Boolean, default: false },
    validated: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;

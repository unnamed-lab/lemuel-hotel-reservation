const mongoose = require("mongoose");
const { Schema } = mongoose;

const companySchema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    url: { type: String },
    imgUrl: { type: String },
    about: { type: String },
    contact: {
      phone: { type: String },
      email: { type: String, lowercase: true, minLength: 8, unique: true },
    },
    regDate: {
      type: Date,
      immutable: true,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    validated: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const companyModel = mongoose.model("Company", companySchema);
module.exports = companyModel;

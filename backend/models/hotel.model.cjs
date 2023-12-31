const mongoose = require("mongoose");
const { Schema } = mongoose;

const {companySchema} = require("./company.models.cjs");

const hotelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    language: [{ type: String }],
    company: { type: companySchema },
    images: [{ type: String }],
    address: String,
    street: String,
    city: String,
    available: String,
    tags: [{ type: String }],
    room: {
      available: {
        type: Number,
        default: 1,
        min: 1,
      },
      total: {
        type: Number,
        default: 1,
        min: 1,
      },
    },
    price: {
      type: Number,
      default: 5000,
      min: 5000,
      required: true,
    },
    accomodation: {
      guest: { type: Number, min: 1, default: 1 },
      max_guest: { type: Number, min: 1, default: 1 },
      bed: { type: Number, min: 1, default: 1 },
      bedroom: { type: Number, min: 1, default: 1 },
      bath: { type: Number, min: 1, default: 1 },
    },
    rating: [{ type: Number }],
    review: [{ type: String }], //  Add User Schema
    faves: [{ type: String }], //  Add User Schema
    isSuperHost: { type: Boolean, default: false },
    customerExp: [{ type: String }],
    policy: {
      rules: [{ type: String }],
      safety: [{ type: String }],
      cancellation: [{ type: String }],
    },
  },
  {
    timestamps: true,
  }
);

const hotelModel = mongoose.model("Hotel", hotelSchema);

module.exports = {
  hotelModel,
};

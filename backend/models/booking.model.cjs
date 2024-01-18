const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Hotel",
    },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    days: { type: Number, required: true, min: 1, default: 1 },
    guests: { type: Number, required: true, min: 1, default: 1 },
    price: { type: Number, required: true },
    fee: { type: Number, required: true },
    validated: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("Booking", orderSchema);
module.exports = orderModel;

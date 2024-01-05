const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    currency: { type: String, enum: ["INR", "USD"], required: true },
    date: { type: Date, default: Date.now },
  },
  {
    collection: "Transactions",
  }
);

module.exports = mongoose.model("Transactions", transactionSchema);

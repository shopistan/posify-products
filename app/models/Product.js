const mongoose = require('mongoose');
const { Model } = require('../config/db');

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sku: { type: String, required: true },
    quantity: { type: Number },
    price: { type: Number, required: true },
    image: { type: String }
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = Model('Product', schema);

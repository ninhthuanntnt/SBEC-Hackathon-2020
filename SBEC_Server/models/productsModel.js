const mongoose = require('mongoose');

const ProductModel = new mongoose.Schema({
  name: String,
  pathImg: String,
  unitPrice: Number,
  color: String,
  material: String,
  xWidth: Number,
  yWidth: Number,
  zWidth: Number,
  type: String,
  createdAt: {type: Number, default: Date.now},
  updatedAt: {type: Number, default: null},
  deletedAt: {type: Number, default: null}
});


module.exports = mongoose.model('product', ProductModel);

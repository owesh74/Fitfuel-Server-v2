const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  itemName: String,
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
});

const OutletSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  menu: [MenuItemSchema],
});

module.exports = mongoose.model('Outlet', OutletSchema);
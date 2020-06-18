const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EstateSchema = new Schema({
  title: String,
  type: {
    type: String,
    enum: ['house', 'room', 'hostal'],
  },
  address: String,
  rooms: Number,
  price: Number,
  area: String
});

module.exports = mongoose.model('Estate', EstateSchema);
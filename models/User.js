const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    index: { unique: true }
  },
  password: String,
  log: [{ date: Date }]
});

module.exports = mongoose.model('User', UserSchema);
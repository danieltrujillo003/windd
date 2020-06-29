const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  password: String,
  log: [{ date: Date }] // TODO: Add isLogged key
});

module.exports = mongoose.model('User', UserSchema);
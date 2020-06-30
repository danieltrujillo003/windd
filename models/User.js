const mongoose = require('mongoose'); // TODO: Add authentication

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    index: { unique: true }
  }, // TODO: Add user field back
  password: String,
  log: [{ date: Date }] // TODO: Add isLogged key
});

module.exports = mongoose.model('User', UserSchema);
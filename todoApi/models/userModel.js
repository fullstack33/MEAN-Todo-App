const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  userName: {
    type: String
  },
  phone: {
    type: Number
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  profile: {
    type: Object
  }
});

const User = mongoose.model('user', userSchema);

module.exports = User

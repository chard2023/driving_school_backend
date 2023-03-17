const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: false },
  username: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
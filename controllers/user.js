require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const UserController = {};

UserController.register = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password, type } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
        firstname,
        lastname,
        username,
        email,
        password: hash,
        type
    });
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

UserController.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Invalid credentials');
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = UserController;

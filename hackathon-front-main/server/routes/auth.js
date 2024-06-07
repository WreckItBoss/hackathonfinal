const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: '1h' });
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send({ error: 'Invalid login credentials' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send({ error: 'Invalid login credentials' });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: '1h' });
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: 'Login failed!' });
  }
});

module.exports = router;

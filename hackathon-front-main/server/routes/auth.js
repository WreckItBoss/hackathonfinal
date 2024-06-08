const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const generateToken = (id)  => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

router.post('register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        res.status(201).json({
            _id: user._id,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(400).json({ message: 'User registration failed' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status8(400).json({ message: 'User login failed' });
    }
});

module.exports = router;

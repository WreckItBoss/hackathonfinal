const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const generateToken = (id)  => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    console.log('Received registration data:', req.body);  // 追加
    if (!email || !password) {
        console.log('Email or password missing');  // 追加
        return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ email, password: hashedPassword });
        res.status(201).json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(400).json({ message: 'User registration failed' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Received login data:', req.body);  // 追加
    if (!email || !password) {
        console.log('Email or password missing');  // 追加
        return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(400).json({ message: 'User login failed' });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const jwt = require('jsonwebtoken');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Middleware to verify token and extract user ID
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret'); // Replace 'your_jwt_secret' with your actual JWT secret
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token is not valid' });
    }
};

router.get('/tasks', verifyToken, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error: Unable to fetch tasks' });
    }
});

router.post('/task', verifyToken, async (req, res) => {
    try {
        const taskCount = await Task.countDocuments({ user: req.user.id, isCompleted: false });
        if (taskCount >= 8) {
            return res.status(400).json({ message: 'Error' });
        }
        const createTask = await Task.create({ ...req.body, user: req.user.id });
        res.status(201).json(createTask);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error: Unable to create task' });
    }
});

router.put('/task/:id', verifyToken, async (req, res) => {
    try {
        const updatedTask = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { $set: req.body },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error: Unable to update task' });
    }
});

router.put('/task/complete/:id', verifyToken, async (req, res) => {
    try {
        const { flowerStatus, isCompleted } = req.body;
        const updatedTask = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { completedAt: new Date(), flowerStatus, isCompleted },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error: Unable to complete task' });
    }
});

router.delete('/task/:id', verifyToken, async (req, res) => {
    try {
        const deleteTask = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!deleteTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(deleteTask);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error: Unable to delete task' });
    }
});

router.get('/tasks/completed-this-week', verifyToken, async (req, res) => {
    try {
        const now = new Date();
        const dayOfWeek = now.getDay();
        const diffToSaturday = (dayOfWeek + 1) % 7;
        const lastSaturday = new Date(now);
        lastSaturday.setDate(now.getDate() - diffToSaturday);
        lastSaturday.setHours(0, 0, 0, 0);

        const nextSunday = new Date(lastSaturday);
        nextSunday.setDate(lastSaturday.getDate() + 7);
        nextSunday.setHours(23, 59, 59, 999);

        const tasks = await Task.find({
            user: req.user.id,
            completedAt: {
                $gte: lastSaturday,
                $lte: nextSunday,
            },
        });

        res.json(tasks);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error: Unable to fetch completed tasks for the week' });
    }
});

module.exports = router;

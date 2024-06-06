const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // {}を外してTaskをインポート

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.json(tasks);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error: Unable to fetch tasks' });
    }
});

router.post('/task', async (req, res) => {
    try {
        const taskCount = await Task.countDocuments({});
        if (taskCount >= 8) {
            return res.status(400).json({ message: 'Please complete the tasks you currently have before adding a new one.' });
        }
        const createTasks = await Task.create(req.body);
        res.status(201).json(createTasks);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error: Unable to create task' });
    }
});

router.delete('/task/:id', async (req, res) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id);
        res.status(200).json(deleteTask);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error: Unable to delete task' });
    }
});

module.exports = router;

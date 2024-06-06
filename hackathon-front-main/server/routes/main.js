// // const express = require('express');
// // const router = express.Router();
// // const Task = require('../models/Task'); // {}を外してTaskをインポート

// // router.use(express.urlencoded({ extended: true }));
// // router.use(express.json());

// // router.get('/tasks', async (req, res) => {
// //     try {
// //         const tasks = await Task.find({});
// //         res.json(tasks);
// //     } catch (error) {
// //         console.error(error.message);
// //         res.status(500).json({ message: 'Server Error: Unable to fetch tasks' });
// //     }
// // });

// // router.post('/task', async (req, res) => {
// //     try {
// //         const taskCount = await Task.countDocuments({});
// //         if (taskCount >= 8) {
// //             return res.status(400).json({ message: 'Please complete the tasks you currently have before adding a new one.' });
// //         }
// //         const createTasks = await Task.create(req.body);
// //         res.status(201).json(createTasks);
// //     } catch (error) {
// //         console.error(error.message);
// //         res.status(500).json({ message: 'Server Error: Unable to create task' });
// //     }
// // });

// // router.delete('/task/:id', async (req, res) => {
// //     try {
// //         const deleteTask = await Task.findByIdAndDelete(req.params.id);
// //         res.status(200).json(deleteTask);
// //     } catch (error) {
// //         console.error(error.message);
// //         res.status(500).json({ message: 'Server Error: Unable to delete task' });
// //     }
// // });

// // module.exports = router;



// const express = require('express');
// const router = express.Router();
// const Task = require('../models/Task');

// router.use(express.urlencoded({ extended: true }));
// router.use(express.json());

// router.get('/tasks', async (req, res) => {
//     try {
//         const tasks = await Task.find({});
//         res.json(tasks);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ message: 'Server Error: Unable to fetch tasks' });
//     }
// });

// router.post('/task', async (req, res) => {
//     try {
//         const taskCount = await Task.countDocuments({});
//         if (taskCount >= 8) {
//             return res.status(400).json({ message: 'Please complete the tasks you currently have before adding a new one.' });
//         }
//         const createTask = await Task.create(req.body);
//         res.status(201).json(createTask);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ message: 'Server Error: Unable to create task' });
//     }
// });

// router.delete('/task/:id', async (req, res) => {
//     try {
//         const deleteTask = await Task.findByIdAndDelete(req.params.id);
//         res.status(200).json(deleteTask);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ message: 'Server Error: Unable to delete task' });
//     }
// });

// router.get('/tasks/completed-this-week', async (req, res) => {
//     try {
//         const now = new Date();
//         const dayOfWeek = now.getDay();
//         const diffToSaturday = (dayOfWeek + 1) % 7; // Days since last Saturday (0 = Saturday, 1 = Sunday, ..., 6 = Friday)
//         const lastSaturday = new Date(now);
//         lastSaturday.setDate(now.getDate() - diffToSaturday);
//         lastSaturday.setHours(0, 0, 0, 0); // Start of last Saturday

//         const nextSunday = new Date(lastSaturday);
//         nextSunday.setDate(lastSaturday.getDate() + 7);
//         nextSunday.setHours(23, 59, 59, 999); // End of next Sunday

//         const tasks = await Task.find({
//             completedAt: {
//                 $gte: lastSaturday,
//                 $lte: nextSunday,
//             },
//         });

//         res.json(tasks);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ message: 'Server Error: Unable to fetch completed tasks for the week' });
//     }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

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
        const createTask = await Task.create(req.body);
        res.status(201).json(createTask);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error: Unable to create task' });
    }
});

router.put('/task/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
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

router.put('/task/complete/:id', async (req, res) => {
    try {
        const { flowerStatus } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { completedAt: new Date(), flowerStatus },
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

router.delete('/task/:id', async (req, res) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id);
        res.status(200).json(deleteTask);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error: Unable to delete task' });
    }
});

router.get('/tasks/completed-this-week', async (req, res) => {
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

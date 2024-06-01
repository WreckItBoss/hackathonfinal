const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Thread = require('../models/Thread');
const { Task } = require('../models/Task'); // Import Task model

router.use(express.urlencoded({ extended: true }));

// Define the /tasks route for AJAX requests to get tasks
router.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().lean();
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get('/', async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    };

    const data = await Thread.find().populate('task');
    const tasks = await Task.find().lean(); // Use .lean() to get plain JavaScript objects
    tasks.forEach(task => {
      console.log(`Task Type: ${task.taskType}, Status: ${task.status}, Flower Image Path: ${task.flowerImages}`);
    });
    res.render('index', { 
      locals,
      data,
      tasks,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    let slug = req.params.id;

    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(slug)) {
      return res.status(400).send('Invalid ID format');
    }

    const data = await Thread.findById(slug).populate('task');

    const locals = {
      title: data.title,
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };
    const taskdata = data.task;
    res.render('post', { 
      locals,
      data,
      taskdata,
      currentRoute: `/${slug}`
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// Post method
router.post('/', async (req, res) => {
  try {
    const { title, content, dueday, taskType } = req.body;

    if (!title || !content || !taskType) {
      return res.status(400).send("All fields are required");
    }

    const newTask = new Task({
      dueDate: dueday,
      taskType: taskType
    });

    newTask.setStatusAndFlowerImage(); // Set status and flowerImages before saving

    await newTask.save();

    const newPost = new Thread({
      title: title,
      content: content,
      task: newTask._id // Assuming Thread schema has a reference to Task
    });

    await newPost.save();

    res.redirect('/'); // Redirect to the main page after saving the task and post

  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id);
    const taskId = thread.task;
    await Task.deleteOne({ _id: taskId });
    await Thread.deleteOne({ _id: req.params.id });
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
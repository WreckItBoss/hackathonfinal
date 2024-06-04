const express = require('express');
const router = express.Router();
const { Task } = require('../models/Task');//Taskモデルを利用できるようにする　{}はTaskモデルだけインポートしている

router.use(express.urlencoded({ extended: true }));

router.get('/api/v1/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});//Taskモデルの全てのデータを取得
        res.json(tasks);//tasksをJSON形式で返す

    } catch (error) {
        console.error(error.message);
    }
});

router.post('/api/v1/task', async (req, res) => {
    try {
        const createTasks = await Task.create(req.body);//Taskモデルにデータを追加
        res.status(200).json(createTasks);//createTasksをJSON形式で返す
    } catch (error) {
        console.error(error.message);
    }
});

router.delete('/api/v1/tasks/:id', async (req, res) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id);//Taskモデルのデータを削除
        res.status(200).json(deleteTask);//deleteTaskをJSON形式で返す
    } catch (error) {
        console.error(error.message);
    }
});

module.exports = router;
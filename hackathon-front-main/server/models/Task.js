
const mongoose = require('mongoose');

// タスク管理のスキーマ
const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100,
    },
    description: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    flower: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    flowerImages: {
        type: String,
        required: true,
    },
    completedAt: {
        type: Date,
    },
    flowerStatus: {
        type: String,
        enum: ['healthy', 'dying', 'dead'],
    },
    isCompleted:{
        type:Boolean,
        default:false,
    },
    taskType: {
        type: String,
        required: true,
        enum: ['study', 'housework', 'activity'],
    },
});

module.exports = mongoose.model('Task', TaskSchema);

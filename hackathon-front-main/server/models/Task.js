// server/models/Task.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Task', TaskSchema);

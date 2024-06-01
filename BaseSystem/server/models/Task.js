const mongoose = require('mongoose');
const cron = require('node-cron');

let io;

// Function to set the io instance
const setSocketIoInstance = (socketIo) => {
  io = socketIo;
};

// Task schema definition with options to include virtuals in JSON and Object outputs
const TaskSchema = new mongoose.Schema({
  taskType: {
    type: String,
    required: true,
    enum: ['study', 'activity', 'housework']
  },
  dueDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String
  },
  flowerImages: {
    type: String
  },
  overtime: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Overtime must be a positive number');
      }
    }
  },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Instance method to set status and flowerImages
TaskSchema.methods.setStatusAndFlowerImage = function() {
  const currentDate = new Date();
  const dueDate = this.dueDate;

  const timeDiff = dueDate.getTime() - currentDate.getTime();
  const dayDiff = timeDiff / (1000 * 3600 * 24);

  if (dayDiff < 0) {
    this.status = 'dead';
  } else if (dayDiff <= 3) {
    this.status = 'dying';
  } else {
    this.status = 'new';
  }

  const flowerImages = {
    study: {
      new: '/img/aliveflower.webp',
      dying: '/img/dyingflower.webp',
      dead: '/img/deadflower.webp'
    },
    activity: {
      new: '/img/aliveflower.webp',
      dying: '/img/dyingflower.webp',
      dead: '/img/deadflower.webp'
    },
    housework: {
      new: '/img/aliveflower.webp',
      dying: '/img/dyingflower.webp',
      dead: '/img/deadflower.webp'
    }
  };

  this.flowerImages = flowerImages[this.taskType][this.status];
};

// Pre-save middleware to set the status and flowerImages
TaskSchema.pre('save', function(next) {
  this.setStatusAndFlowerImage();
  next();
});

// After saving the task, emit an update event
TaskSchema.post('save', function(doc, next) {
  if (io) {
    io.emit('taskUpdated', doc);
  }
  next();
});

// Cron job for periodic updates
const Task = mongoose.model('Task', TaskSchema);

cron.schedule('* * * * *', async () => {
  console.log('Running task status update job');
  const tasks = await Task.find();
  const currentDate = new Date();

  tasks.forEach(async (task) => {
    task.setStatusAndFlowerImage();
    await task.save();
    if (io) {
      io.emit('taskUpdated', task); // Emit event after saving
    }
  });
});

module.exports = { Task, setSocketIoInstance };

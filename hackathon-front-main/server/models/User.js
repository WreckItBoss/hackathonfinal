// server/models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }]
});

module.exports = mongoose.model('User', UserSchema);

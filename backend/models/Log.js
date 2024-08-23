const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference the User model
    required: true,
  },
  // Your existing fields
  date: {
    type: Date,
    default: Date.now,
  },
  techniques: {
    type: String,
    required: true,
  },
  progress: {
    type: String,
    required: true,
  },
  goals: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Log', LogSchema);

const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  techniques: {
    type: String,
    required: true,
  },
  progress: {
    type: String,
  },
  goals: {
    type: String,
  },
});

module.exports = mongoose.model('Log', LogSchema);

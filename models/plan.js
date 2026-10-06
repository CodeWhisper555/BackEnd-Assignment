const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    trim: true
  },
  hours: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  completed: {
    type: Boolean,
    default: false
  },
  deadline: {
    type: Date,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Plan', planSchema);
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  lawyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lawyer',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['appointment', 'consultation', 'document', 'payment', 'profile_update']
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Activity', activitySchema);

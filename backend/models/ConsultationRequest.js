const mongoose = require('mongoose');

const consultationRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lawyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lawyer',
    required: true
  },
  requestType: {
    type: String,
    enum: ['consultation', 'appointment'],
    default: 'consultation'
  },
  message: {
    type: String,
    default: 'New consultation request'
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ConsultationRequest', consultationRequestSchema);

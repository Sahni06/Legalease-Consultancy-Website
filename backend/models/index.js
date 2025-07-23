const mongoose = require('mongoose');

// Only define the model if it hasn't been defined yet
const Lawyer = mongoose.models.Lawyer || require('./lawyer');
const User = mongoose.models.User || require('./User');
const ConsultationRequest = mongoose.models.ConsultationRequest || require('./ConsultationRequest');

module.exports = {
  Lawyer,
  User,
  ConsultationRequest
}; 
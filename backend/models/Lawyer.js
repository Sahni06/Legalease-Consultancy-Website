const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const practiceAreasEnum = [
  'Criminal Law',
  'Civil Law',
  'Corporate Law',
  'Family Law',
  'Real Estate Law',
  'Intellectual Property',
  'Tax Law',
  'Labor Law',
  'Constitutional Law',
  'Environmental Law',
  'Immigration Law',
  'Bankruptcy Law'
];

const availabilityDaySchema = new mongoose.Schema({
  isAvailable: {
    type: Boolean,
    default: false
  },
  hours: [{
    type: String
  }]
}, { _id: false });

const lawyerSchema = new mongoose.Schema({
  // Basic Information
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: true  // This ensures password is included in queries
  },
  profilePicture: {
    type: String
  },

  // Professional Details
  lawFirmName: {
    type: String,
    trim: true
  },
  practiceAreas: [{
    type: String
  }],
  experience: {
    type: String
  },
  barCouncilNumber: {
    type: String,
    required: true
  },

  // Education & Languages
  education: [{
    type: String
  }],
  certifications: [{
    type: String
  }],
  languages: [{
    type: String
  }],

  // Location & Availability
  location: {
    type: String
  },
  availability: {
    monday: [availabilityDaySchema],
    tuesday: [availabilityDaySchema],
    wednesday: [availabilityDaySchema],
    thursday: [availabilityDaySchema],
    friday: [availabilityDaySchema],
    saturday: [availabilityDaySchema],
    sunday: [availabilityDaySchema]
  },

  // Fees & Payment
  consultationFee: {
    type: Number
  },
  paymentMethods: [{
    type: String
  }],

  // Status and Verification
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  // New fields
  specialization: {
    type: String
  },
  cases: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Case'
  }]
}, {
  timestamps: true
});

// Add a virtual field for total consultations
lawyerSchema.virtual('totalConsultations', {
  ref: 'ConsultationRequest',
  localField: '_id',
  foreignField: 'lawyer',
  count: true
});

// Add a virtual field for rating
lawyerSchema.virtual('rating').get(function() {
  return this.reviews ? 
    this.reviews.reduce((acc, review) => acc + review.rating, 0) / this.reviews.length :
    4.5; // Default rating
});

// Ensure virtuals are included in JSON
lawyerSchema.set('toJSON', { virtuals: true });
lawyerSchema.set('toObject', { virtuals: true });

// Add your methods
lawyerSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Modify find methods to include password
lawyerSchema.pre(/^find/, function(next) {
  this.select('+password');
  next();
});

// Method to check password
lawyerSchema.methods.comparePassword = async function(candidatePassword) {
  // For development, directly compare passwords
  return this.password === candidatePassword;
  
  // For production, use this instead:
  // return await bcrypt.compare(candidatePassword, this.password);
};

// Export the practice areas for use in frontend
lawyerSchema.statics.getPracticeAreas = function() {
  return practiceAreasEnum;
};

// Only create the model if it hasn't been registered yet
module.exports = mongoose.models.Lawyer || mongoose.model('Lawyer', lawyerSchema);
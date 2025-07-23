const ConsultationRequest = require('../models/ConsultationRequest');
const Lawyer = require('../models/Lawyer');
const User = require('../models/User');

exports.createConsultationRequest = async (req, res) => {
  try {
    const { lawyerId, requestType, preferredTime, message } = req.body;

    // Validate lawyer exists before creating request
    const lawyer = await Lawyer.findById(lawyerId);
    if (!lawyer) {
      return res.status(404).json({
        success: false,
        message: 'Lawyer not found'
      });
    }

    const consultation = await ConsultationRequest.create({
      user: req.user._id,
      lawyer: lawyerId,
      requestType,
      preferredTime,
      message
    });

    // Populate lawyer details
    await consultation.populate('lawyer', 'fullName email');

    // Here you would typically send a notification to the lawyer
    // Implementation depends on your notification system

    res.status(201).json({
      success: true,
      message: 'Consultation request sent successfully',
      data: consultation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating consultation request',
      error: error.message
    });
  }
};

exports.getLawyerConsultations = async (req, res) => {
  try {
    const consultations = await ConsultationRequest.find({ lawyer: req.lawyer._id })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: consultations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching consultations',
      error: error.message
    });
  }
};

exports.updateConsultationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const consultation = await ConsultationRequest.findById(req.params.id);

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation request not found'
      });
    }

    consultation.status = status;
    await consultation.save();

    res.json({
      success: true,
      message: 'Consultation status updated successfully',
      data: consultation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating consultation status',
      error: error.message
    });
  }
};

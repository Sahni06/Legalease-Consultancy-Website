const Appointment = require('../models/Appointment');

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ lawyer: req.lawyer._id })
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const appointment = new Appointment({
      ...req.body,
      lawyer: req.lawyer._id
    });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ message: 'Error creating appointment' });
  }
}; 
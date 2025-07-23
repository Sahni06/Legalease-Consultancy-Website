const Lawyer = require('../models/Lawyer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const lawyerController = {
  signup: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const lawyer = await Lawyer.findOne({ email });
      if (lawyer) {
        return res.status(400).json({ message: 'Lawyer already exists' });
      }
      const newLawyer = new Lawyer({ name, email, password: await bcrypt.hash(password, 10) });
      await newLawyer.save();
      res.status(201).json({ message: 'Lawyer registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const lawyer = await Lawyer.findOne({ email });
      if (!lawyer || !await bcrypt.compare(password, lawyer.password)) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: lawyer._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
      res.json({ token, lawyer: { id: lawyer._id, name: lawyer.name, email: lawyer.email } });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  getLawyerProfile: async (req, res) => {
    try {
      const lawyer = await Lawyer.findById(req.user.id).select('-password');
      if (!lawyer) return res.status(404).json({ message: 'Lawyer not found' });
      res.json(lawyer);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  updateLawyerProfile: async (req, res) => {
    try {
      const lawyer = await Lawyer.findByIdAndUpdate(req.user.id, req.body, { new: true }).select('-password');
      res.json(lawyer);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = lawyerController;
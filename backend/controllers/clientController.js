const Client = require('../models/Client');

exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find({ lawyer: req.lawyer._id })
      .sort({ createdAt: -1 });

    res.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ message: 'Error fetching clients' });
  }
}; 
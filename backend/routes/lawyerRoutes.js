const express = require('express');
const router = express.Router();
const lawyerController = require('../controllers/lawyerController');
const auth = require('../middleware/auth');

// Public routes
router.post('/lawyers/signup', lawyerController.signup);
router.post('/lawyers/login', lawyerController.login);

// Protected routes
router.get('/lawyers/profile', auth, lawyerController.getLawyerProfile);
router.put('/lawyers/profile', auth, lawyerController.updateLawyerProfile);

module.exports = router;
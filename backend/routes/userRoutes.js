const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateUser = require('../middleware/authMiddleware');

// Route to get a user's profile by ID
router.get('/profile', authenticateUser, userController.getUserProfile);

// Route to update a user's profile by ID
router.put('/profile', authenticateUser, userController.updateUserProfile);

module.exports = router;

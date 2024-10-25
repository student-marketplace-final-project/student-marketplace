const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to get a user's profile by ID
router.get('/profile/:id', userController.getUserProfile);

// Route to update a user's profile by ID
router.put('/profile/:id', userController.updateUserProfile);

module.exports = router;

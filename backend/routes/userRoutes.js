const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to get a user's profile by ID
router.get('/profile/:id', userController.getUserProfile);

module.exports = router;

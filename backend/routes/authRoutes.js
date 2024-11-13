// Import necessary functions
const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

// Register route
router.post(
    '/register',
    [
        body('name').notEmpty().withMessage('Full name is required'),
        body('email').isEmail().withMessage('Please enter a valid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('phone_number').notEmpty().withMessage('Contact number is required')
    ],
    authController.register
);

// Login route
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Please enter a valid email address'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    authController.login
);

// Route for requesting password reset
router.post('/forgot-password', authController.forgotPassword);

// Route for resetting password with the token
router.post('/reset-password/:token', authController.resetPassword);

module.exports = router;

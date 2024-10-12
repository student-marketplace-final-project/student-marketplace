const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerUser, findUserByEmail } = require('../models/userModel');

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
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email } = req.body;
        try {
            // Check if user already exists
            const existingUser = await findUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Register user
            await registerUser(req.body);
            res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Server error' });
        }
    }
);

// Login route
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Please enter a valid email address'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const user = await findUserByEmail(email);

            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            // Check password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user.user_id }, 'jwtSecret', { expiresIn: '1h' });

            res.status(200).json({ token });
        } catch (err) {
            res.status(500).json({ message: 'Server error' });
        }
    }
);

module.exports = router;

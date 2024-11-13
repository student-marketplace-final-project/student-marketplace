// Import necessary functions and database connection
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const {validationResult} = require('express-validator');
const {findUserByEmail, registerUser} = require("../models/userModel")

// Registers a new user, ensuring no duplicates and validating input
const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {email} = req.body;
    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }

        await registerUser(req.body);
        res.status(201).json({message: 'User registered successfully'});
    } catch (err) {
        res.status(500).json({message: 'Server error'});
    }
};

// Authenticates user credentials and returns a token with the user's role if successful
const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    try {
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(400).json({message: 'Invalid email or password'});
        }

        if (user.is_archived === 1) {
            return res.status(403).json({message: 'Account is archived. Please contact support for assistance.'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'Invalid email or password'});
        }

        const token = jwt.sign({userId: user.user_id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.status(200).json({token, role: user.role});
    } catch (err) {
        res.status(500).json({message: 'Server error'});
    }
};

// Generates a JWT token for password reset, with a short expiry
const generateResetToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_RESET_SECRET, {
        expiresIn: process.env.RESET_TOKEN_EXPIRY,
    });
};

// Sends a password reset email with a unique token link
const sendResetEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const resetLink = `http://localhost:3001/auth/reset-password/${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        text: `Click on the following link to reset your password: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);
};

// Initiates password reset process by validating user email and sending a reset token
const forgotPassword = (req, res) => {
    const {email} = req.body;

    const query = 'SELECT user_id FROM UserDetails WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({error: 'User not found'});
        }

        const userId = results[0].user_id;
        const token = generateResetToken(userId);

        try {
            await sendResetEmail(email, token);
            res.json({message: 'Password reset email sent'});
        } catch (error) {
            res.status(500).json({error: 'Error sending email'});
        }
    });
};

// Resets user password upon verifying the token and hashing the new password
const resetPassword = (req, res) => {
    const {token} = req.params;
    const {newPassword} = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);
        const userId = decoded.userId;

        bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({error: 'Error hashing password'});
            }

            const updateQuery = 'UPDATE UserDetails SET password = ? WHERE user_id = ?';
            db.query(updateQuery, [hashedPassword, userId], (dbErr) => {
                if (dbErr) {
                    return res.status(500).json({error: 'Error updating password'});
                }
                res.json({message: 'Password updated successfully'});
            });
        });
    } catch (error) {
        res.status(400).json({error: 'Invalid or expired token'});
    }
};

module.exports = {register, login, forgotPassword, resetPassword};
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const db = require('../config/db');

// Function to generate the reset token
const generateResetToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_RESET_SECRET, {
        expiresIn: process.env.RESET_TOKEN_EXPIRY,
    });
};

// Function to send the reset email
const sendResetEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const resetLink = `http://localhost:5000/api/auth/reset-password/${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        text: `Click on the following link to reset your password: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);
};

// Controller to handle the forgot password request
exports.forgotPassword = (req, res) => {
    const { email } = req.body;

    const query = 'SELECT user_id FROM UserDetails WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userId = results[0].user_id;
        const token = generateResetToken(userId);

        try {
            await sendResetEmail(email, token);
            res.json({ message: 'Password reset email sent' });
        } catch (error) {
            res.status(500).json({ error: 'Error sending email' });
        }
    });
};

// Function to handle the password reset
exports.resetPassword = (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);
        const userId = decoded.userId;

        // Hash the new password before saving it
        bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({ error: 'Error hashing password' });
            }

            // Use the hashed password to update in the database
            const updateQuery = 'UPDATE UserDetails SET password = ? WHERE user_id = ?';
            db.query(updateQuery, [hashedPassword, userId], (dbErr) => {
                if (dbErr) {
                    return res.status(500).json({ error: 'Error updating password' });
                }
                res.json({ message: 'Password updated successfully' });
            });
        });
    } catch (error) {
        res.status(400).json({ error: 'Invalid or expired token' });
    }
};

const db = require('../config/db');
const { fetchAllUsers } = require('../models/userModel');

const getUserProfile = (req, res) => {
    const userId = req.user.userId;

    // Query to get user details based on user ID
    const query = 'SELECT user_id, name, address, phone_number, email, is_student, created_at FROM UserDetails WHERE user_id = ?';

    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Server error while retrieving user profile' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Send the user's profile details
        res.json(results[0]);
    });
};

const updateUserProfile = (req, res) => {
    const userId = req.user.userId;
    const { name, address, phone_number, email, is_student } = req.body;

    // Query to update user details based on user ID
    const query = 'UPDATE UserDetails SET name = ?, address = ?, phone_number = ?, email = ?, is_student = ? WHERE user_id = ?';

    db.query(query, [name, address, phone_number, email, is_student, userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Server error while updating user profile' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found or no changes made' });
        }

        // Send a success response
        res.json({ message: 'Profile updated successfully' });
    });
};

const archiveUser = (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE UserDetails SET is_archived = TRUE WHERE user_id = ?';

    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Server error archiving user' });
        res.json({ message: 'User archived successfully' });
    });
};

const archiveOwnUser = (req, res) => {
    const userId = req.user.userId; // Extract user ID from the authenticated token

    const query = 'UPDATE UserDetails SET is_archived = 1 WHERE user_id = ?';

    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Server error while archiving account' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found or already archived' });
        }
        res.json({ message: 'Account archived successfully' });
    });
};

const getAllUsers = async (req, res) => {
    try {
        const users = await fetchAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error while retrieving users' });
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    archiveUser,
    archiveOwnUser,
    getAllUsers
};

const db = require('../config/db');

const getUserProfile = (req, res) => {
    const userId = req.params.id;

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
    const userId = req.params.id;
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

module.exports = {
    getUserProfile,
    updateUserProfile
};

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

module.exports = {
    getUserProfile,
};

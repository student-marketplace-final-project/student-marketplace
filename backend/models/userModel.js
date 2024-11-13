// Import necessary modules
const bcrypt = require('bcryptjs');
const db = require('../config/db')

// Register a new user
const registerUser = async (userDetails) => {
    try {
        // Destructure user details
        const { name, address, phone_number, email, password, is_student } = userDetails;

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user details into the database
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO UserDetails (name, address, phone_number, email, is_student, password, created_at) 
                 VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
                [name, address, phone_number, email, is_student, hashedPassword],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                }
            );
        });
    } catch (error) {
        throw new Error('Error registering user');
    }
};

// Find user by email for login
const findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM UserDetails WHERE email = ?`,
            [email],
            (err, result) => {
                if (err) return reject(err);
                resolve(result[0]);
            }
        );
    });
};

// Fetch all users (admin functionality)
const fetchAllUsers = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT user_id, name, email, phone_number, role, is_archived, created_at FROM UserDetails';

        db.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Export functions to be used in other parts of the application
module.exports = { registerUser, findUserByEmail, fetchAllUsers };

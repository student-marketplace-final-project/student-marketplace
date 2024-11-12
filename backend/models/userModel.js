const bcrypt = require('bcryptjs');
const db = require('../config/db')

// Register a new user
const registerUser = async (userDetails) => {
    try {
        const { name, address, phone_number, email, password, is_student } = userDetails;
        const hashedPassword = await bcrypt.hash(password, 10);
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

const fetchAllUsers = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT user_id, name, email, phone_number, role, is_archived, created_at FROM UserDetails';

        db.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

module.exports = { registerUser, findUserByEmail, fetchAllUsers };

// Import necessary functions and database connection
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Middleware for user authentication
const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET); // Decode and attach user info to req.user
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Middleware to restrict access to admins
const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied: Admins only' });
    }
    next();
};

// Middleware to check if the user owns the ad or is an admin
const checkAdOwnership = (req, res, next) => {
    const adId = req.params.id;
    const userId = req.user.userId;
    const userRole = req.user.role;

    // Allow admin access
    if (userRole === 'admin') {
        return next();
    }

    const query = 'SELECT user_id FROM Ads WHERE ad_id = ?';
    db.query(query, [adId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Server error while verifying ad ownership' });
        }

        if (results.length === 0) {
            console.log("43");
            return res.status(404).json({ error: 'Ad not found' });
        }

        const adOwnerId = results[0].user_id;
        if (adOwnerId !== userId) {
            return res.status(403).json({ error: 'Access denied: You can only archive your own ads' });
        }

        next();
    });
};

// Middleware for user ownership or admin access
const requireOwnershipOrAdmin = (req, res, next) => {
    const { id } = req.params;
    const { userId, role } = req.user;

    if (role === 'admin' || userId === id) {
        return next();
    }
    return res.status(403).json({ error: 'Access denied' });
};

module.exports = { authenticateUser, requireAdmin, requireOwnershipOrAdmin, checkAdOwnership };

const jwt = require('jsonwebtoken');
const db = require('../config/db');

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract the token from the header

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify token and get user ID from the payload
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied: Admins only' });
    }
    next();
};

const checkAdOwnership = (req, res, next) => {
    const adId = req.params.id;
    const userId = req.user.userId; // Ensure `req.user` has been populated by the `authenticateUser` middleware
    const userRole = req.user.role;

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

const requireOwnershipOrAdmin = (req, res, next) => {
    const { id } = req.params; // resource ID, e.g., user or ad
    const { userId, role } = req.user;

    if (role === 'admin' || userId === id) {
        return next();
    }
    return res.status(403).json({ error: 'Access denied' });
};

module.exports = { authenticateUser, requireAdmin, requireOwnershipOrAdmin, checkAdOwnership };

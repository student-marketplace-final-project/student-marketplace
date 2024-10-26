const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract the token from the header

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify token and get user ID from the payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authenticateUser;

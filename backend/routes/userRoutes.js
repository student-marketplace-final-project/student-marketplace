const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const marketplaceController = require('../controllers/marketplaceController')
const { requireAdmin, requireOwnershipOrAdmin, authenticateUser } = require('../middleware/authMiddleware');

// Route to get a user's profile by ID
router.get('/profile', authenticateUser, userController.getUserProfile);

// Route to update a user's profile by ID
router.put('/profile', authenticateUser, userController.updateUserProfile);


router.put('/archive/:id', authenticateUser, requireAdmin, userController.archiveUser); // Admin archives user
router.put('/archive-own', authenticateUser, userController.archiveOwnUser); // User archives own account

// marketplaceRoutes.js
router.put('/ads/archive/:id', authenticateUser, requireOwnershipOrAdmin, marketplaceController.archiveAd); // Archive specific ad

router.put('/users/activate/:id', authenticateUser, requireAdmin, userController.activateUser);

router.get('/users', authenticateUser, requireAdmin, userController.getAllUsers);

module.exports = router;


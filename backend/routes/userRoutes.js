// Import necessary functions
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const marketplaceController = require('../controllers/marketplaceController')
const {requireAdmin, requireOwnershipOrAdmin, authenticateUser} = require('../middleware/authMiddleware');

// Route to get a user's profile by ID (needs user token)
router.get('/profile', authenticateUser, userController.getUserProfile);

// Route to update a user's profile by ID (needs user token)
router.put('/profile', authenticateUser, userController.updateUserProfile);

// Route to archive a user by id (needs admin token)
router.put('/archive/:id', authenticateUser, requireAdmin, userController.archiveUser);

// Route to archive own user (needs user token)
router.put('/archive-own', authenticateUser, userController.archiveOwnUser);

// Route to archive an ad by id (needs admin token)
router.put('/ads/archive/:id', authenticateUser, requireOwnershipOrAdmin, marketplaceController.archiveAd);

// Route to activate a user (needs admin token)
router.put('/users/activate/:id', authenticateUser, requireAdmin, userController.activateUser);

// Router to get all active and archived users for admin panel (needs admin token)
router.get('/users', authenticateUser, requireAdmin, userController.getAllUsers);

module.exports = router;


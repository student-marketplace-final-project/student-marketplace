// Import necessary functions
const express = require('express');

const {
    archiveAd,
    getAllAds,
    searchProducts,
    getCategories,
    postAd,
    getSingleAd,
    getAllAdsForAdmin,
    activateAdByAdmin,
    getUserAds
} = require('../controllers/marketplaceController');
const {authenticateUser, checkAdOwnership, requireAdmin} = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get all active ads with optional filters and sorting (needs user token)
router.get('/ads', authenticateUser, getAllAds);

// Route to search products by name (needs user token)
router.get('/ads/search', authenticateUser, searchProducts);

// Route to get all active and archived ads for the admin panel
router.get('/ads/admin', authenticateUser, requireAdmin, getAllAdsForAdmin);

// Route to get all ads for a specific user
router.get('/ads/user', authenticateUser, getUserAds);

// Route to get a single Ad's data (needs user token)
router.get('/ads/:id', authenticateUser, getSingleAd);

// Route for getting available categories (needs user token)
router.get('/categories', authenticateUser, getCategories);

// Route for posting an ad with different category types (needs user token)
router.post('/ads', authenticateUser, postAd);

// Route for admin and users to archive ads (needs user or admin token)
// Users can only archive their own ads
router.put('/ads/archive/:id', authenticateUser, checkAdOwnership, archiveAd);

// Route to activate and archived ad by the admin (needs admin token)
router.put('/ads/activate/:id', authenticateUser, requireAdmin, activateAdByAdmin);

module.exports = router;
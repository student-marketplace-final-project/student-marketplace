const express = require('express');
const { archiveAd, getAllAds, searchProducts, getCategories, postAd, getSingleAd } = require('../controllers/marketplaceController');
const { authenticateUser, checkAdOwnership } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get all ads with optional filters and sorting
router.get('/ads', authenticateUser, getAllAds);

router.get('/ads/search', authenticateUser, searchProducts);

router.get('/ads/:id', authenticateUser, getSingleAd);

// Route for getting available categories
router.get('/categories', authenticateUser, getCategories);

// Route for posting an ad
router.post('/ads', authenticateUser, postAd);

router.put('/ads/archive/:id', authenticateUser, checkAdOwnership, archiveAd);

module.exports = router;
const express = require('express');
const { getAllAds, searchProducts, getCategories, postAd } = require('../controllers/marketplaceController');
const { archiveAd } = require('../controllers/marketplaceController');
const { authenticateUser, requireAdmin, checkAdOwnership } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get all ads with optional filters and sorting
router.get('/ads', getAllAds);

router.get('/ads/search', searchProducts);

// Route for getting available categories
router.get('/categories', getCategories);

// Route for posting an ad
router.post('/ads', postAd);

router.put('/ads/archive/:id', authenticateUser, checkAdOwnership, archiveAd);

module.exports = router;
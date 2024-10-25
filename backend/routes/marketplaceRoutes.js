const express = require('express');
const { getAllAds, searchProducts, getCategories, postAd } = require('../controllers/marketplaceController');
const router = express.Router();

// Route to get all ads with optional filters and sorting
router.get('/ads', getAllAds);

router.get('/ads/search', searchProducts);

// Route for getting available categories
router.get('/categories', getCategories);

// Route for posting an ad
router.post('/ads', postAd);

module.exports = router;
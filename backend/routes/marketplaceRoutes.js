// Updated Route in routes/marketplaceRoutes.js
const express = require('express');
const { getAllAds } = require('../controllers/marketplaceController');
const router = express.Router();

// Route to get all ads with optional filters and sorting
router.get('/ads', getAllAds);

module.exports = router;
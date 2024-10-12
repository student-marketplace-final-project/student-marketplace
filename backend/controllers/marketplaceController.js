const { fetchAllAds } = require('../models/marketplaceModel');

// Controller function to get all ads with optional filters and sorting
const getAllAds = async (req, res) => {
    const { category, minPrice, maxPrice, sortBy, userLocation } = req.query;
    try {
        const ads = await fetchAllAds(category, minPrice, maxPrice, sortBy, userLocation);
        res.status(200).json(ads);
    } catch (error) {
        res.status(500).json({ message: 'Server error while retrieving ads' });
    }
};

module.exports = { getAllAds };
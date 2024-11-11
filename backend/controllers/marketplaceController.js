const { fetchAllAds, searchProductsByName, addAd, addCategoryData, fetchAdById } = require('../models/marketplaceModel');
const db = require('../config/db');

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

const searchProducts = async (req, res) => {
    const { searchTerm } = req.query;
    if (!searchTerm) {
        return res.status(400).json({ message: 'Search term is required' });
    }

    try {
        const products = await searchProductsByName(searchTerm);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error while searching for products' });
    }
};

// Get available categories
const getCategories = (req, res) => {
    const categories = ['Vehicles', 'Accommodation', 'Services', 'Electronics', 'Furniture', 'Appliances'];
    res.status(200).json(categories);
};

// Add a new ad
const postAd = async (req, res) => {
    const { category_type, categoryData, adData } = req.body;

    try {
        // Step 1: Add category-specific data
        const categoryId = await addCategoryData(category_type, categoryData);

        // Step 2: Add general ad data with the new category ID
        const adInfo = { ...adData, user_id: req.user.userId, category_type, category_id: categoryId };
        await addAd(adInfo);

        res.status(201).json({ message: 'Ad posted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error while posting ad', error });
    }
};

const archiveAd = (req, res) => {
    const adId = req.params.id;
    const query = 'UPDATE Ads SET is_archived = 1 WHERE ad_id = ?';

    db.query(query, [adId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error archiving ad' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Ad not found' });
        }
        res.json({ message: 'Ad archived successfully' });
    });
};

const getSingleAd = async (req, res) => {
    const adId = req.params.id;

    try {
        const ad = await fetchAdById(adId);

        if (!ad) {
            return res.status(404).json({ message: 'Ad not found' });
        }

        res.status(200).json(ad);
    } catch (error) {
        res.status(500).json({ message: 'Server error while retrieving ad details' });
    }
};

module.exports = { getAllAds, searchProducts, getCategories, postAd, archiveAd, getSingleAd };
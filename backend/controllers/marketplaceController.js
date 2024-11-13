// Import necessary functions and database connection
const { fetchAllAds, searchProductsByName, addAd, addCategoryData, fetchAdById, fetchAllAdsForAdmin, activateAd } = require('../models/marketplaceModel');
const db = require('../config/db');

// Retrieve all ads based on optional filters and sorting
const getAllAds = async (req, res) => {
    const { category, minPrice, maxPrice, sortBy, userLocation } = req.query;
    try {
        const ads = await fetchAllAds(category, minPrice, maxPrice, sortBy, userLocation);
        res.status(200).json(ads);
    } catch (error) {
        res.status(500).json({ message: 'Server error while retrieving ads' });
    }
};

// Search for products by name
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

// Retrieve the list of available categories
const getCategories = (req, res) => {
    const categories = ['Vehicles', 'Accommodation', 'Services', 'Electronics', 'Furniture', 'Appliances'];
    res.status(200).json(categories);
};

// Post a new ad based on provided data
const postAd = async (req, res) => {
    const { category_type, categoryData, adData } = req.body;

    try {
        const categoryId = await addCategoryData(category_type, categoryData);

        const adInfo = { ...adData, user_id: req.user.userId, category_type, category_id: categoryId };
        await addAd(adInfo);

        res.status(201).json({ message: 'Ad posted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error while posting ad', error });
    }
};

// Archive an ad by setting its status to archived
const archiveAd = (req, res) => {
    const adId = req.params.id;
    const query = 'UPDATE Ads SET is_archived = 1 WHERE ad_id = ?';

    db.query(query, [adId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error archiving ad' });
        }
        if (results.affectedRows === 0) {
            console.log("62");
            return res.status(404).json({ error: 'Ad not found' });
        }
        res.json({ message: 'Ad archived successfully' });
    });
};

// Get details of a single ad based on its ID
const getSingleAd = async (req, res) => {
    const adId = req.params.id;

    try {
        const ad = await fetchAdById(adId);

        if (!ad) {
            console.log("75");
            return res.status(404).json({ message: 'Ad not found' });
        }

        res.status(200).json(ad);
    } catch (error) {
        res.status(500).json({ message: 'Server error while retrieving ad details' });
    }
};

// Retrieve all ads (active and archived) for admin view
const getAllAdsForAdmin = async (req, res) => {
    try {
        const ads = await fetchAllAdsForAdmin();

        res.status(200).json({
            ads
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error while retrieving ads' });
    }
};

// Activate a previously archived ad by admin
const activateAdByAdmin = async (req, res) => {
    const adId = req.params.id;

    try {
        const result = await activateAd(adId);
        res.status(200).json(result);
    } catch (error) {
        if (error.message === 'Ad not found') {
            res.status(404).json({ error: 'Ad not found' });
        } else {
            res.status(500).json({ error: 'Server error while activating ad' });
        }
    }
};

// Export all controller functions for use in routes
module.exports = { getAllAds, searchProducts, getCategories, postAd, archiveAd, getSingleAd, getAllAdsForAdmin, activateAdByAdmin };
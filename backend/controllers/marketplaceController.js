const { fetchAllAds, searchProductsByName, addAd, addCategoryData } = require('../models/marketplaceModel');

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
        const adInfo = { ...adData, category_type, category_id: categoryId };
        await addAd(adInfo);

        res.status(201).json({ message: 'Ad posted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error while posting ad', error });
    }
};

module.exports = { getAllAds, searchProducts, getCategories, postAd };
const mysql = require('mysql2');

// Database connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'y93624bp',
    database: 'Marketplace'
});

// Function to fetch all ads with optional filters and sorting
const fetchAllAds = (category, minPrice, maxPrice, sortBy, userLocation) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT Ads.ad_id, Ads.title, Ads.description, Ads.price, Ads.image, Ads.created_at, Categories.category_name, Ads.location_lat, Ads.location_lon 
                     FROM Ads 
                     LEFT JOIN Categories ON Ads.category_id = Categories.category_id`;

        let conditions = [];
        let values = [];

        // Add filters for category and price range
        if (category) {
            conditions.push('Categories.category_name = ?');
            values.push(category);
        }
        if (minPrice) {
            conditions.push('Ads.price >= ?');
            values.push(minPrice);
        }
        if (maxPrice) {
            conditions.push('Ads.price <= ?');
            values.push(maxPrice);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        // Add sorting
        if (sortBy) {
            if (sortBy === 'newest') {
                query += ' ORDER BY Ads.created_at DESC';
            } else if (sortBy === 'priceLowToHigh') {
                query += ' ORDER BY Ads.price ASC';
            } else if (sortBy === 'priceHighToLow') {
                query += ' ORDER BY Ads.price DESC';
            }
        }

        // Add filter for closest items based on user location
        if (userLocation) {
            const [userLat, userLon] = userLocation.split(',');
            if (userLat && userLon && !isNaN(userLat) && !isNaN(userLon)) {
                if (sortBy) {
                    query += `, (POW((Ads.location_lat - ?), 2) + POW((Ads.location_lon - ?), 2)) ASC`;
                } else {
                    query += ` ORDER BY (POW((Ads.location_lat - ?), 2) + POW((Ads.location_lon - ?), 2)) ASC`;
                }
                values.push(userLat, userLon);
            }
        }

        db.query(query, values, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

module.exports = { fetchAllAds };
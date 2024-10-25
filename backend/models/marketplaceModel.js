const mysql = require('mysql2');

// Database connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'y93624bp',
    database: 'Marketplace'
});

const fetchAllAds = (category, minPrice, maxPrice, sortBy, userLocation) => {
    return new Promise((resolve, reject) => {
        let query = `
            SELECT 
                Ads.ad_id, 
                Ads.title, 
                Ads.description, 
                Ads.price, 
                Ads.image, 
                Ads.created_at, 
                Ads.location_lat, 
                Ads.location_lon, 
                Ads.category_type,
                CASE 
                    WHEN Ads.category_type = 'Vehicles' THEN Vehicles.vehicle_id
                    WHEN Ads.category_type = 'Accommodation' THEN Accommodation.accommodation_id
                    WHEN Ads.category_type = 'Services' THEN Services.service_id
                    WHEN Ads.category_type = 'Electronics' THEN Electronics.electronic_id
                    WHEN Ads.category_type = 'Furniture' THEN Furniture.furniture_id
                    WHEN Ads.category_type = 'Appliances' THEN Appliances.appliance_id
                END AS category_id
            FROM Ads
            LEFT JOIN Vehicles ON Ads.category_id = Vehicles.vehicle_id AND Ads.category_type = 'Vehicles'
            LEFT JOIN Accommodation ON Ads.category_id = Accommodation.accommodation_id AND Ads.category_type = 'Accommodation'
            LEFT JOIN Services ON Ads.category_id = Services.service_id AND Ads.category_type = 'Services'
            LEFT JOIN Electronics ON Ads.category_id = Electronics.electronic_id AND Ads.category_type = 'Electronics'
            LEFT JOIN Furniture ON Ads.category_id = Furniture.furniture_id AND Ads.category_type = 'Furniture'
            LEFT JOIN Appliances ON Ads.category_id = Appliances.appliance_id AND Ads.category_type = 'Appliances'
        `;

        // Initialize conditions and values arrays
        let conditions = [];
        let values = [];

        // Add filter for category if provided
        if (category) {
            conditions.push('Ads.category_type = ?');
            values.push(category);
        }

        // Add filters for price range if provided
        if (minPrice) {
            conditions.push('Ads.price >= ?');
            values.push(minPrice);
        }
        if (maxPrice) {
            conditions.push('Ads.price <= ?');
            values.push(maxPrice);
        }

        // If there are conditions, add them to the query
        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        // Add sorting logic
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

        // Execute the query
        db.query(query, values, (err, results) => {
            if (err) return reject(err);

            // Map over the results to remove unnecessary fields
            const cleanedResults = results.map(ad => {
                const { category_type, category_id, ...commonFields } = ad;
                return {
                    ...commonFields,
                    category_type,
                    category_details: { id: category_id } // This holds the relevant ID based on category_type
                };
            });

            resolve(cleanedResults);
        });
    });
};

const searchProductsByName = (searchTerm) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT ad_id, title, description, price, image, created_at
                       FROM Ads
                       WHERE title LIKE ?`;
        const values = [`%${searchTerm}%`];

        db.query(query, values, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const addAd = (adData) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO Ads (user_id, title, description, price, image, category_type, category_id, phone_number, location_lat, location_lon)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            adData.user_id,
            adData.title,
            adData.description,
            adData.price,
            adData.image,
            adData.category_type,
            adData.category_id,
            adData.phone_number,
            adData.location_lat,
            adData.location_lon
        ];

        db.query(query, values, (err, result) => {
            if (err) return reject(err);
            resolve(result.insertId); // Return the ID of the inserted ad
        });
    });
};

const addCategoryData = (table, categoryData) => {
    return new Promise((resolve, reject) => {
        const columns = Object.keys(categoryData).join(', ');
        const placeholders = Object.keys(categoryData).map(() => '?').join(', ');
        const values = Object.values(categoryData);

        const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;

        db.query(query, values, (err, result) => {
            if (err) return reject(err);
            resolve(result.insertId); // Return the ID of the inserted record
        });
    });
};

module.exports = { fetchAllAds, searchProductsByName, addAd, addCategoryData };
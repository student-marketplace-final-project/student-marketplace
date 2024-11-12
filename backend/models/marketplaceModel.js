
const db = require('../config/db');

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
            WHERE Ads.is_archived = 0
        `;

        // Initialize conditions and values arrays
        let conditions = [];
        let values = [];

        // Filter by category if provided
        if (category) {
            conditions.push('Ads.category_type = ?');
            values.push(category);
        }

        // Filter by minPrice and maxPrice if provided
        if (minPrice) {
            conditions.push('Ads.price >= ?');
            values.push(minPrice);
        }
        if (maxPrice) {
            conditions.push('Ads.price <= ?');
            values.push(maxPrice);
        }

        // Apply conditions to the query
        if (conditions.length > 0) {
            query += ' AND ' + conditions.join(' AND ');
        }

        // Sort by the specified option if provided
        if (sortBy) {
            if (sortBy === 'newest') {
                query += ' ORDER BY Ads.created_at DESC';
            } else if (sortBy === 'priceLowToHigh') {
                query += ' ORDER BY Ads.price ASC';
            } else if (sortBy === 'priceHighToLow') {
                query += ' ORDER BY Ads.price DESC';
            }
        }

        // Add distance sorting if userLocation is provided
        if (userLocation) {
            const [userLat, userLon] = userLocation.split(',');
            if (!isNaN(userLat) && !isNaN(userLon)) {
                query += sortBy ? ',' : ' ORDER BY';
                query += ` (POW((Ads.location_lat - ?), 2) + POW((Ads.location_lon - ?), 2)) ASC`;
                values.push(userLat, userLon);
            }
        }

        db.query(query, values, (err, results) => {
            if (err) return reject(err);

            const cleanedResults = results.map(ad => {
                const { category_type, category_id, ...commonFields } = ad;
                return {
                    ...commonFields,
                    category_type,
                    category_details: { id: category_id }
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
                       WHERE is_archived = 0 AND title LIKE ?`;
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

const fetchAdById = (adId) => {
    return new Promise((resolve, reject) => {
        const query = `
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
                    WHEN Ads.category_type = 'Vehicles' THEN JSON_OBJECT('make', Vehicles.make, 'model', Vehicles.model, 'year', Vehicles.year)
                    WHEN Ads.category_type = 'Accommodation' THEN JSON_OBJECT('available_date', Accommodation.available_date, 'parking', Accommodation.parking, 'smoking', Accommodation.smoking, 'furnished', Accommodation.furnished, 'pets', Accommodation.pets)
                    WHEN Ads.category_type = 'Services' THEN JSON_OBJECT('opening_hours', Services.opening_hours)
                    WHEN Ads.category_type = 'Electronics' THEN JSON_OBJECT('brand', Electronics.brand, 'condition', Electronics.condition)
                    WHEN Ads.category_type = 'Furniture' THEN JSON_OBJECT('material', Furniture.material, 'condition', Furniture.condition)
                    WHEN Ads.category_type = 'Appliances' THEN JSON_OBJECT('type', Appliances.type, 'condition', Appliances.condition)
                    ELSE NULL
                    END AS category_details
            FROM Ads
                     LEFT JOIN Vehicles ON Ads.category_id = Vehicles.vehicle_id AND Ads.category_type = 'Vehicles'
                     LEFT JOIN Accommodation ON Ads.category_id = Accommodation.accommodation_id AND Ads.category_type = 'Accommodation'
                     LEFT JOIN Services ON Ads.category_id = Services.service_id AND Ads.category_type = 'Services'
                     LEFT JOIN Electronics ON Ads.category_id = Electronics.electronic_id AND Ads.category_type = 'Electronics'
                     LEFT JOIN Furniture ON Ads.category_id = Furniture.furniture_id AND Ads.category_type = 'Furniture'
                     LEFT JOIN Appliances ON Ads.category_id = Appliances.appliance_id AND Ads.category_type = 'Appliances'
            WHERE Ads.ad_id = ? AND Ads.is_archived = 0
        `;

        db.query(query, [adId], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]); // Return the single ad object if found
        });
    });
};

const fetchAllAdsForAdmin = () => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                ad_id, title, description, price, image, created_at, location_lat, location_lon, 
                category_type, category_id, is_archived 
            FROM Ads
        `;

        db.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = { fetchAllAds, searchProductsByName, addAd, addCategoryData, fetchAdById, fetchAllAdsForAdmin };
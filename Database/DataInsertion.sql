-- Insert data into UserDetails
INSERT INTO UserDetails (name, address, phone_number, email, is_student, password, created_at)
VALUES
('Alice Johnson', '123 University St, City ville', '1234567890', 'alice.johnson@university.edu', true, 'password123', NOW()),
('Bob Smith', '456 College Ave, Townsville', '0987654321', 'bob.smith@gmail.com', false, 'password123', NOW()),
('Charlie Brown', '789 Campus Rd, City ville', '1122334455', 'charlie.brown@university.edu', true, 'password123', NOW());

-- Insert data into Ads
INSERT INTO Ads (user_id, title, description, price, image, category_type, category_id, phone_number, location_lat, location_lon, created_at)
VALUES
(1, 'Used Sofa', 'A comfortable 3-seater sofa in good condition.', 100.00, NULL, 'Furniture', true, '1234567890', 40.712776, -74.005974, NOW()),
(2, 'Toyota Corolla 2010', 'Well-maintained Toyota Corolla, perfect for students.', 5000.00, NULL, 'Vehicles', 1, '0987654321', 35.712776, -75.005974, NOW()),
(3, 'Apartment for Rent', 'Spacious 2-bedroom apartment with all amenities.', 1200.00, NULL, 'Accommodation', 1, '1122334455', 30.712776, -69.005974, NOW());

-- Insert data into Furniture table
INSERT INTO Furniture (type, material, `condition`)
VALUES ('Sofa', 'Wood', 'Used');

-- Insert data into Vehicles table
INSERT INTO Vehicles (make, model, year, mileage)
VALUES
('Toyota', 'Corolla', 2010, 120000);

-- Insert data into Accommodation table
INSERT INTO Accommodation (type, bedrooms, bathrooms, available_date, parking, smoking, furnished, pets)
VALUES
('studio', 1, 1, '2024-11-01', true, false, true, false);

-- Insert data into Services table
INSERT INTO Services (opening_hours, provider)
VALUES
('9:00 AM - 6:00 PM', 'Cleaning Ease');

-- Insert data into Appliances table
INSERT INTO Appliances (type, `condition`)
VALUES
('Washing Machine', 'Used');

-- Insert data into Comments
INSERT INTO Comments (ad_id, user_id, comment, created_at)
VALUES
(1, 2, 'Is this still available?', NOW()),
(2, 3, 'Can I come and have a look this weekend?', NOW()),
(3, 1, 'Is there any warranty left on this laptop?', NOW());

-- Insert data into Favorites
INSERT INTO Favorites (user_id, ad_id, created_at)
VALUES
(1, 2, NOW()),
(2, 1, NOW()),
(3, 3, NOW());

-- Insert data into Transactions
INSERT INTO Transactions (buyer_id, ad_id, transaction_date, status)
VALUES
(1, 2, NOW(), 'Completed'),
(3, 1, NOW(), 'Pending'),
(2, 3, NOW(), 'Completed');

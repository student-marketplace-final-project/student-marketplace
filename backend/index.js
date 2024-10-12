require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const marketplaceRoutes = require('./routes/marketplaceRoutes');

const app = express();

app.use(express.json());

// Use the authentication routes
app.use('/api/auth', authRoutes);

// Use the marketplace routes
app.use('/api/marketplace', marketplaceRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

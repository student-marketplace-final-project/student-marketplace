require('dotenv').config(); // Load environment variables from a .env file

const express = require('express');
const authRoutes = require('./routes/authRoutes');
const marketplaceRoutes = require('./routes/marketplaceRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors'); // Used to allow connections from the front-edn

const app = express();

// Set request size limits for JSON and URL-encoded data to accommodate image uploads and large payloads
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }))

// Enable CORS for requests from the frontend server at http://localhost:3001
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));


app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/marketplace', marketplaceRoutes);

app.use('/api/user', userRoutes);

// Start the server on the specified port or default to port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

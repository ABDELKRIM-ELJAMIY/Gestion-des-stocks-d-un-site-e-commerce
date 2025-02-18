const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const productController = require('./controllers/productController');

dotenv.config();

const app = express();
app.use(express.json());

// CORS setup to allow frontend to make requests
const corsOptions = {
    origin: "http://localhost:3000", // React frontend's port
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Routesproduct
app.post('/api/product', productController.createProduct);
app.get('/api/products', productController.getAllProducts);
app.put('/api/product/:id', productController.updateProduct);
app.delete('/api/products/:id', productController.deleteProduct);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerceDB')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Start the server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

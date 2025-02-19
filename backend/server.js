const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer'); // Import multer for file uploads
const path = require('path');
const productController = require('./controllers/productController');

dotenv.config();

const app = express();
app.use(express.json());

// CORS setup to allow frontend to make requests
app.use(cors());

// Set up Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Save uploaded files to the 'uploads' folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Use unique filenames to avoid collisions
    }
});

const upload = multer({ storage: storage }); // Create an upload instance using the storage configuration

// Routes
app.post('/api/product', upload.single('image'), productController.createProduct); // Use Multer to handle file upload
app.get('/api/products', productController.getAllProducts);
app.put('/api/product/:id', productController.updateProduct);
app.delete('/api/products/:id', productController.deleteProduct);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerceDB')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use('/uploads', express.static('uploads')); // Serve images from the 'uploads' folder

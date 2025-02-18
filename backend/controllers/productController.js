const Product = require('../models/productModel'); // Ton modèle de produit

// Fonction pour créer un produit
const createProduct = async (req, res) => {
    try {
        const { title, description, price, stock, imageUrl } = req.body;

        if (!title || !description || !price || !stock || !imageUrl) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newProduct = new Product({
            title,
            description,
            price,
            stock,
            imageUrl
        });

        await newProduct.save();

        // Message personnalisé dans la réponse
        res.status(201).json({
            message: 'Product created successfully',
            product: newProduct
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour récupérer tous les produits
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour mettre à jour un produit
const updateProduct = async (req, res) => {
    try {
        const { title, description, price, stock, imageUrl } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { title, description, price, stock, imageUrl, updatedAt: Date.now() },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour supprimer un produit
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
};

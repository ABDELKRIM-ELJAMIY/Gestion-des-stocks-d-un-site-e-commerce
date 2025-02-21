import React, { useState, useEffect } from 'react';
import ProductForm from './ProductForm';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [productToEdit, setProductToEdit] = useState(null);

    const fetchProducts = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/products");
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:8080/api/products/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Failed to delete product");
            }

            setProducts(products.filter(product => product._id !== id));
        } catch (err) {
            console.error("Error deleting product:", err);
        }
    };

    const handleEdit = (product) => {
        setProductToEdit(product);
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-black text-white">
            <ProductForm onAddProduct={fetchProducts} productToEdit={productToEdit} />
            <h2 className="text-3xl font-bold text-center mb-6 text-white-600 pt-4 pb-4">
                Product List
            </h2>

            <div className="space-y-6">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div
                            key={product._id}
                            className="p-5 rounded-xl shadow-md flex items-center space-x-6 hover:shadow-lg transition duration-300 bg-transparent border border-white"
                        >
                            <img
                                src={`http://localhost:8080${product.imageUrl}`}
                                alt={product.title}
                                className="w-28 h-28 object-cover rounded-lg border border-gray-300"
                            />
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-200">{product.title}</h3>
                                <p className="mt-1 text-gray-400">{product.description}</p>
                                <p className="font-bold text-lg mt-2 text-green-500">{product.price}Dh</p>
                                <p className="mt-1 text-gray-300">Stock: {product.stock}</p>
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => handleEdit(product)}
                                    className="px-5 py-2 rounded-lg bg-blue-500 text-white flex items-center space-x-2 hover:bg-blue-600 transition"
                                >
                                    <i className="bx bx-edit-alt"></i>
                                    <span>Edit</span>
                                </button>
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className="px-5 py-2 rounded-lg bg-red-500 text-white flex items-center space-x-2 hover:bg-red-600 transition"
                                >
                                    <i className="bx bxs-trash" style={{ color: '#ffffff' }}></i>
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-lg text-gray-500">No products available</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;

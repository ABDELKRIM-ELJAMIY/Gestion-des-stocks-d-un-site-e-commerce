import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";

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
        <div className="max-w-4xl mx-auto mt-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Product List</h2>

           
            <ProductForm onAddProduct={fetchProducts} productToEdit={productToEdit} />

            
            <div className="space-y-4 mt-6">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="border p-4 rounded-lg shadow-md flex items-center space-x-4">
                            <img
                                src={`http://localhost:8080${product.imageUrl}`}
                                alt={product.title}
                                className="w-24 h-24 object-cover rounded"
                            />
                            <div className="flex-1">
                                <h3 className="text-lg font-bold">{product.title}</h3>
                                <p className="text-gray-600">{product.description}</p>
                                <p className="text-green-500 font-bold">${product.price}</p>
                                <p className="text-gray-500">Stock: {product.stock}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEdit(product)} 
                                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                                >
                                    Modify
                                </button>
                                <button
                                    onClick={() => handleDelete(product._id)} 
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No products available</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ProductList = () => {
    const navigate = useNavigate(); // Create navigate function
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    return (
        <div>
            <h2>Product List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <p>Stock: {product.stock}</p>
                        <img src={`http://localhost:8080${product.imageUrl}`} alt={product.title} />

                    </li>
                ))}
            </ul>
            <button onClick={() => navigate("/")} >Go Back to Dashboard</button> {/* Go to Dashboard Button */}
            <button onClick={() => navigate("/add-product")}>Add New Product</button> {/* Navigate to Add Product */}
        </div>
    );
};

export default ProductList;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ProductForm = () => {
    const navigate = useNavigate(); // Create navigate function
    const [product, setProduct] = useState({
        title: "",
        description: "",
        price: "",
        stock: "",
        image: null, // Store image file
    });

    const handleChange = (e) => {
        // Handle form changes
        if (e.target.name === "image") {
            setProduct({ ...product, image: e.target.files[0] }); // Set the selected image file
        } else {
            setProduct({ ...product, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(); // Create FormData to handle file uploads

        formData.append("title", product.title);
        formData.append("description", product.description);
        formData.append("price", product.price);
        formData.append("stock", product.stock);
        formData.append("image", product.image); // Append image file to FormData

        try {
            const response = await fetch("http://localhost:8080/api/product", {
                method: "POST",
                body: formData, // Send form data including image
            });

            if (response.ok) {
                alert("Product added successfully!");
                setProduct({ title: "", description: "", price: "", stock: "", image: null });
                navigate("/products"); // Navigate to Product List after successful submission
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={product.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={product.description}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={product.stock}
                    onChange={handleChange}
                    required
                />
                <input
                    type="file"
                    name="image"
                    onChange={handleChange} // Handle image file selection
                    required
                />
                <button type="submit">Add Product</button>
            </form>
            <button onClick={() => navigate("/products")}>Go Back to Products</button> {/* Go Back Button */}
            <button onClick={() => navigate("/")}>Go to Dashboard</button> {/* Go to Dashboard Button */}
        </div>
    );
};

export default ProductForm;

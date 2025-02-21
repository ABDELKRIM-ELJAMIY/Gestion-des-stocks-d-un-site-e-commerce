import { useState, useEffect } from "react";

const ProductForm = ({ onAddProduct, productToEdit }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState(null);
    const [productId, setProductId] = useState(null);

    useEffect(() => {
        if (productToEdit) {
            setTitle(productToEdit.title);
            setDescription(productToEdit.description);
            setPrice(productToEdit.price);
            setStock(productToEdit.stock);
            setProductId(productToEdit._id);
        }
    }, [productToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("stock", stock);
        if (image) formData.append("image", image);  

        try {
            const res = productId
                ? await fetch(`http://localhost:8080/api/product/${productId}`, {
                    method: "PUT",
                    body: formData,
                })
                : await fetch("http://localhost:8080/api/product", {
                    method: "POST",
                    body: formData,
                });

            if (!res.ok) {
                throw new Error("Failed to add or update product");
            }

            onAddProduct(); 
            setTitle("");
            setDescription("");
            setPrice("");
            setStock("");
            setImage(null);
            setProductId(null); 
        } catch (err) {
            console.error("Error adding or updating product:", err);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">{productId ? "Edit Product" : "Add New Product"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full border p-2 rounded"
                    required={!productId} 
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    {productId ? "Update Product" : "Add Product"}
                </button>
            </form>
        </div>
    );
};

export default ProductForm;

import { useState, useEffect, forwardRef } from "react";

const ProductForm = forwardRef(({ onAddProduct, productToEdit }, ref) => {
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
        <div className="bg-black p-6 rounded-lg shadow-md" ref={ref}>
            <h2 className="text-xl font-bold mb-4 text-center text-white">{productId ? "Edit Product" : "Add New Product"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-center">
                <div className="space-y-1">
                    <label className="text-white text-lg font-semibold drop-shadow-md">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border p-2 rounded text-white bg-black"
                        required
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-white text-lg font-semibold drop-shadow-md">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border p-2 rounded text-white bg-black"
                        required
                    />
                </div>
                <div className="flex space-x-4">
                    <div className="space-y-1 w-1/2">
                        <label className="text-white text-lg font-semibold drop-shadow-md">Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full border p-2 rounded text-white bg-black"
                            required
                        />
                    </div>
                    <div className="space-y-1 w-1/2">
                        <label className="text-white text-lg font-semibold drop-shadow-md">Stock</label>
                        <input
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            className="w-full border p-2 rounded text-white bg-black"
                            required
                        />
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-white text-lg font-semibold drop-shadow-md">Image</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full border p-2 rounded text-white bg-black"
                        required={!productId}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    {productId ? "Update Product" : "Add Product"}
                </button>
            </form>
        </div>
    );
});

export default ProductForm;

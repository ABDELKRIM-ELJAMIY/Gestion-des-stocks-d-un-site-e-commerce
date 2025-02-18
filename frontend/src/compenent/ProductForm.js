import { useState } from "react";

const ProductForm = ({ onAddProduct }) => {
    const [product, setProduct] = useState({
        title: "",
        description: "",
        price: "",
        stock: "",
        image: null
    });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setProduct({ ...product, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", product.title);
        formData.append("description", product.description);
        formData.append("price", product.price);
        formData.append("stock", product.stock);
        formData.append("image", product.image);

        onAddProduct(formData);
        setProduct({ title: "", description: "", price: "", stock: "", image: null });
    };

    return (
        <>
            <div className="w-full h-screen flex justify-center items-center bg-gradient-to-b from-black to-red-600 p-6">
                <form
                    onSubmit={handleSubmit}
                // className="w-full max-w-2xl p-6 rounded-2xl shadow-lg border border-white 
                //            bg-gradient-to-b from-red-600 to-black text-white"
                >
                    <h2 className="text-2xl font-bold text-white mb-4 text-center">
                        Add New Product
                    </h2>

                    <div className="mb-4">
                        <label className="block text-white font-medium mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Product Title"
                            value={product.title}
                            onChange={handleChange}
                            className="w-full border border-white bg-transparent text-white 
                        px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-300"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-white font-medium mb-1">Description</label>
                        <textarea
                            name="description"
                            placeholder="Product Description"
                            value={product.description}
                            onChange={handleChange}
                            className="w-full border border-white bg-transparent text-white 
                        px-3 py-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-300"
                            rows="4"
                        ></textarea>
                    </div>

                    {/* Price & Stock in the same line */}
                    <div className="flex gap-4 mb-4">
                        <div className="w-1/2">
                            <label className="block text-white font-medium mb-1">Price (dh)</label>
                            <input
                                type="number"
                                name="price"
                                placeholder="0.00"
                                value={product.price}
                                onChange={handleChange}
                                className="w-full border border-white bg-transparent text-white 
                            px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-300"
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-white font-medium mb-1">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                placeholder="Quantity"
                                value={product.stock}
                                onChange={handleChange}
                                className="w-full border border-white bg-transparent text-white 
                            px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-300"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-white font-medium mb-1"><i className="bx bx-image-add bx-burst" style={{ color: '#311111' }}></i>
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full border border-white px-3 py-2 rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white text-black font-semibold py-3 rounded-lg 
                    hover:bg-gray-200 transition duration-200 shadow-md"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </>
    );
};

export default ProductForm;

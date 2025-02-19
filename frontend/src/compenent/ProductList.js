const ProductList = () => {
    const products = [
        { id: 1, title: "Product A", description: "Description Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", price: 100, stock: 5, image: "/images/COMTABI.jpg" },
        { id: 2, title: "Product B", description: "Description B", price: 150, stock: 3, image: "/images/COMTABI.jpg" },
        { id: 3, title: "Product C", description: "Description C", price: 200, stock: 2, image: "/images/COMTABI.jpg" },
    ];

    return (
        <div className="max-w-3xl mx-auto bg-transparent p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Product List</h2>
            <ul className="space-y-4 bg-transparent">
                {products.map((product) => (
                    <li key={product.id} className="border p-4 rounded-lg shadow-md bg-transparent flex items-center space-x-4">

                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-24 h-24 object-cover rounded-md"
                        />

                        <div className="flex-1">
                            <h3 className="font-bold text-lg">{product.title}</h3>
                            <p className="text-gray-400">{product.description}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                <span className="font-semibold">Price:</span> ${product.price} |
                                <span className="font-semibold"> Stock:</span> {product.stock}
                            </p>
                        </div>

                        {/* Buttons aligned to the end */}
                        <div className="flex space-x-2 justify-end">
                            <button className="text-red-500 px-3 py-1 rounded">
                                <i className='bx bx-trash text-xl'></i>
                            </button>
                            <button className="text-blue-500 px-3 py-1 rounded">
                                <i className='bx bxs-edit text-xl'></i>
                            </button>
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;

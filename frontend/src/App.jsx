// import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import { useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center">Stock Management</h1>
      
      <ProductList />
    </div>
  );
}

export default App;

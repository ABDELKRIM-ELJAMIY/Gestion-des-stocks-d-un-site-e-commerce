import ProductList from "./components/ProductList";
import { useState } from "react";
import 'boxicons/css/boxicons.min.css';

function App() {
  const [products, setProducts] = useState([]);

  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <div className="p-6 bg-black">
      <h1 className="text-3xl font-bold text-center text-white">Stock Management</h1>
      <ProductList />
    </div>
  );
}

export default App;

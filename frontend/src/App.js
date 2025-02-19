import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-product" element={<ProductForm />} />
            <Route path="/products" element={<ProductList />} />
        </Routes>
    );
}

export default App;

import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <nav>
                <ul>
                    <li><Link to="/add-product">Add Product</Link></li>
                    <li><Link to="/products">View Products</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Dashboard;

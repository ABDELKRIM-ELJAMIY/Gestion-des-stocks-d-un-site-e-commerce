import logo from './logo.svg';
import './App.css';
import 'boxicons/css/boxicons.min.css';
// import AdminPage from "./compenent/adminAage";
import ProductForm from './compenent/ProductForm';
// import ProductForm from './compenent/ProductForm';
import ProductList from './compenent/ProductList';
function App() {
  return (
    <div className=" bg-no-repeat  bg-gradient-to-b from-black to-red-600 App">
      <ProductForm />
      {/* <AdminPage /> */}
      <ProductList />

      {/* <h1>hhhhhhhhhhhhhhhhhhhhhhhhh</h1> */}
    </div>
  );
}

export default App;

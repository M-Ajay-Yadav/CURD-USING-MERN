// import logo from './logo.svg';
import "./App.css";
import Footer from "./Components/Footer/Footer.jsx";
import Nav from "./Components/Nav/Nav.jsx";
import SignUp from "./Components/SignUP/SignUp.jsx";
import PrivateComponent from "./Components/Private/private.jsx";
import Login from "./Components/Login/Login.jsx";
import AddProduct from "./Components/AddProduct/AddProduct.jsx";
import ProductList from "./Components/ProductList/ProductList.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateProduct from "./Components/UpdateProduct/UpdateProduct.jsx";
import User from "./Components/User/User.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />

        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update" element={<UpdateProduct />} />
            <Route path={`/update/:id`} element={<UpdateProduct />} />
            <Route path="/logout" element={<h1>List of logout</h1>} />
            <Route path="/profile" element={<User />} />
          </Route>
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

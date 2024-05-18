// import logo from './logo.svg';
import './App.css';
import Footer from './Components/Footer/Footer.js';
import Nav from './Components/Nav/Nav.js';
import SignUp from './Components/SignUP/SignUp.js';
import PrivateComponent from './Components/Private/private.js';
import Login from './Components/Login/Login.js';
import AddProduct from './Components/AddProduct/AddProduct.js';
import ProductList from './Components/ProductList/ProductList.js';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UpdateProduct from './Components/UpdateProduct/UpdateProduct.js';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Nav/>
       {/* <h1>PROJECT1</h1> */}
     <Routes>
      <Route element={<PrivateComponent/>}>

        <Route path="/" element={<ProductList/>}/>
        <Route path="/add" element={<AddProduct/>}/>
        <Route path="/update" element={<UpdateProduct/>}/> 
        <Route path={`/update/:id`} element={<UpdateProduct/>}/> 
        <Route path="/logout" element={<h1>List of logout</h1>}/>
        <Route path="/profile" element={<h1>List of profile</h1>}/>

      </Route>
        <Route path="/Signup" element={<SignUp/>}/>
       <Route path='/login' element={<Login/>}/>
     </Routes>
       </BrowserRouter>
       <Footer/>
       

    </div>
  );
}

export default App;

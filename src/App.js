import './App.css';
import Navbar from './Navbar';
import Home from './Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import ForgetPasswordPage from './components/pages/ForgetPasswordPage'
import Productlist from './components/pages/Productlist'
import Productsearch from './components/pages/Productsearch'
import Product from './components/pages/Product'
import Cart from './components/pages/Cart'
import Display from './components/pages/Display';

import AdminLoginPage from './components/pages/AdminLoginPage'
import AdminOrders from './components/admin/AdminOrders'
import AdminProducts from './components/admin/AdminProducts'
import AdminUsers from './components/admin/AdminUsers'
import AdminProduct from './components/admin/AdminProduct'
import AdminCategories from './components/admin/AdminCategories'
import AdminCategory from './components/admin/AdminCategory'
import Orders from './components/pages/Orders';


function App() {
  return (
    <div className="App">
     <Router>
         <Switch>
             <Route exact path="/">
                <Navbar/>
                <Home/>
             </Route>
              <Route path="/Login" >
                <Navbar/>
                <LoginPage/>
              </Route>
              <Route path="/register" >
                <Navbar/>
                <RegisterPage/>
              </Route> 
              <Route path="/forget-password">
                <Navbar/>
                <ForgetPasswordPage/>
              </Route>
              <Route path="/products/:id">
                <Navbar/>
                <Productlist/>
              </Route> 
              <Route path="/productsearch">
                <Navbar/>
                <Productsearch/>
              </Route> 
              <Route path="/product/:id">
                <Navbar/>
                <Product/>
              </Route> 
              <Route path="/cart">
                <Navbar/>
                <Cart/>
              </Route> 
              <Route path="/orders">
                <Navbar/>
                <Orders/>
              </Route> 
              <Route path="/displayinfo">
                <Navbar/>
              <Display/>
              </Route>


              <Route path="/AdminLogin" >
                <Navbar/>
                <AdminLoginPage/>
              </Route>
              <Route path="/AdminOrders" >
                <Navbar/>
                <AdminOrders/>
              </Route>
              <Route path="/AdminProducts" >
                <Navbar/>
                <AdminProducts/>
              </Route>
              <Route path="/AdminProduct/:id" >
                <Navbar/>
                <AdminProduct/>
              </Route>
              <Route path="/AdminCategories" >
                <Navbar/>
                <AdminCategories/>
              </Route>
              <Route path="/AdminCategory/:id" >
                <Navbar/>
                <AdminCategory/>
              </Route>
              <Route path="/AdminUsers" >
                <Navbar/>
                <AdminUsers/>
              </Route>
         </Switch>
     </Router>
    </div>
  );
}

export default App;

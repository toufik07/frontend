import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
const Navbar = () => {
    let history = new useHistory();
    const cookies = new Cookies();
    let usertype = "";

    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        usertype = cookies.get("usertype");
        if(usertype !== "Admin")
        {
            document.getElementById("menuAdmin").style.display = "none";
        }
        else{
            document.getElementById("menuAdmin").style.display = "inline";
        }
        if(usertype === "User")
        {
            document.getElementById("menuLogin").style.display = "none";
            document.getElementById("menuOrders").style.display = "inline";
            document.getElementById("menuLogout").style.display = "inline";
            document.getElementById("divUser").innerText = "Hello " + cookies.get("name");
        }
        else{
            document.getElementById("menuLogin").style.display = "inline";
            document.getElementById("menuOrders").style.display = "none";
            document.getElementById("menuLogout").style.display = "none";
        }
        axios.get('http://localhost:5000/api/categories')
            .then((response) => {
                setCategories(response.data.data.data);
            });
        var products = JSON.parse(localStorage.getItem("products"));
        if(products != null)
            document.getElementById("spnCount").innerText = products.length; 


    }, []);

    function logout(){
        localStorage.clear();
        cookies.set('userid', '', { path: '/' });
        cookies.set('name', '', { path: '/' });
        cookies.set('email', '', { path: '/' });        
        cookies.set('mobileno', '', { path: '/' });        
        cookies.set('usertype', '', { path: '/' });
        window.location.replace("/");
    }

    return (  
        <header class="section-header">
        <section class="header-main border-bottom">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-xl-2 col-lg-3 col-md-12">
                    <Link to="/" class="brand-wrap">
                       <h2>Shop<span>ichi</span></h2>
                    </Link> 
                </div>
                <div class="col-xl-6 col-lg-5 col-md-6">
                    <form action="productsearch" class="search-header">
                        <div class="input-group w-100">
                            <input type="text" class="form-control" placeholder="Search" name="search" />                            
                            <div class="input-group-append">
                              <button class="btn btn-primary" type="submit">
                                <i class="fa fa-search"></i> Search
                              </button>
                            </div>
                        </div>
                    </form> 
                </div> 
                <div class="col-xl-4 col-lg-4 col-md-6">
                    <div class="widgets-wrap float-md-right">
                        <div class="widget-header mr-3" id="menuLogin">
                             <Link to="/Login">  <a href="#" class="widget-view">
                                <div class="icon-area">
                                    <i class="fa fa-user"></i>
                                </div>
                                 <small class="text">Login</small>
                            </a></Link> 
                        </div>
                        <div class="widget-header mr-3" id="menuOrders">
                            <Link to="/orders" class="widget-view">
                                <div class="icon-area">
                                    <i class="fa fa-store"></i>
                                </div>
                                <small class="text"> Orders </small>
                            </Link>
                        </div>
                        <div class="widget-header">
                            <Link to="/cart" class="widget-view">
                                <div class="icon-area">
                                    <i class="fa fa-shopping-cart"></i>
                                    <span id="spnCount" class="notify">0</span>
                                </div>
                                <small class="text"> Cart </small>
                            </Link>
                        </div>
                        <div class="widget-header" id="menuLogout">
                            <a href="#" onClick={logout} class="widget-view">
                                <div class="icon-area">
                                <i class="fa fa-sign"></i>
                                </div>
                                <small class="text"> Logout </small>
                            </a>
                        </div>
                    </div> 
                </div>
            </div>
        </div> 
    </section> 
    <nav class="navbar navbar-main navbar-expand-lg border-bottom">
    <div class="container">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_nav" aria-controls="main_nav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
    
        <div class="collapse navbar-collapse" id="main_nav">
        <ul class="navbar-nav">
            <li class="nav-item dropdown" id="menuAdmin">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#"> <i class="fa fa-user text-muted mr-2"></i> Administration </a>
                <div class="dropdown-menu dropdown-large">
                    <nav class="row">
                        <div class="col-12">
                            <Link to="/AdminOrders">Orders</Link>
                            <Link to="/AdminProducts">Products</Link>
                            <Link to="/AdminProduct/0">Add Product</Link>
                            <Link to="/AdminCategories">Categories</Link>
                            <Link to="/AdminCategory/0">Add Category</Link>
                            <Link to="/AdminUsers">Users</Link>

                            <button onClick={logout}>Logout</button>
                        </div>
                    </nav> 
                </div> 
            </li>
            {categories.map((data, i) => {
                console.log(data.id);
            return (
            <li class="nav-item">
                <Link to={"../products/" + data._id } class="nav-link" href="#">{data.name}</Link>
            </li>
            )})}
        </ul>
        <ul class="navbar-nav ml-md-auto">
                <li class="nav-item">
                    <a class="nav-link" id="divUser"></a>
                </li>
            {/* <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="http://example.com" data-toggle="dropdown">English</a>
                <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="#">Russian</a>
                <a class="dropdown-item" href="#">French</a>
                <a class="dropdown-item" href="#">Spanish</a>
                <a class="dropdown-item" href="#">Chinese</a>
                </div>
            </li> */}
            </ul>
        </div> 
    </div> 
    </nav>
    
    </header> 
    );
}
 
export default Navbar;
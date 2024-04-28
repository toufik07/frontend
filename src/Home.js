import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getSymbolFromCurrency from 'currency-symbol-map';
import { Button } from 'reactstrap';

const Home = () => {
  const [categories, setCategories] = useState([]);
    const [products, setAPIData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/api/products')
            .then((response) => {
                setAPIData(response.data.data.data);
            })
            axios.get('http://localhost:5000/api/categories')
            .then((response) => {
                setCategories(response.data.data.data);
            })
    }, [])

    function addtocart(event){
      event.preventDefault();
      let productid = event.target.value;

      var products = [];
        var exists = false;
        var product = {
            "productid": productid,
            "quantity": 1
        };
        var oldProducts = JSON.parse(localStorage.getItem("products"));
        console.log(oldProducts);
        if (oldProducts != null) {
            for (var i = 0; i < oldProducts.length; i++) {
                if (product.productid !== oldProducts[i].productid) {
                    products.push(oldProducts[i]);
                } else {
                    exists = true;
                    oldProducts[i].quantity = 1;
                    products.push(oldProducts[i]);
                }
            }
        }
        if (!exists) {
            products.push(product);
        }
        localStorage.setItem("products", JSON.stringify(products));
        refreshCart();
      }
  
      
      function refreshCart() {
        var products = JSON.parse(localStorage.getItem("products"));
        if(products != null)
          document.getElementById("spnCount").innerText = products.length; 
      }
    
    return ( 
        <div className="home">
             <div class="container-fluid">
   
   <section class="section-main padding-y">
   <main class="card">
       <div class="card-body">
   
   <div class="row">
       <aside class="col-lg col-md-3 flex-lg-grow-0">
           <nav class="nav-home-aside">
               <h6 class="title-category">MY MARKETS <i class="d-md-none icon fa fa-chevron-down"></i></h6>
               <ul class="menu-category">
               {categories.map((data, i) => {
                return (
                   <Link to={"products/" + data._id } class="nav-link" href="#">{data.name}</Link>
                  )})}
               </ul>
           </nav>
       </aside>
       <div class="col-md-9 col-xl-9 col-lg-9">
   
 
   <div id="carousel1_indicator" class="slider-home-banner carousel slide" data-ride="carousel">
     <ol class="carousel-indicators">
       <li data-target="#carousel1_indicator" data-slide-to="0" class="active"></li>
       <li data-target="#carousel1_indicator" data-slide-to="1"></li>
       <li data-target="#carousel1_indicator" data-slide-to="2"></li>
     </ol>
     <div class="carousel-inner">
       <div class="carousel-item active">
         <img src="assets/images/banners/c2.jpg" alt="First slide" /> 
       </div>
       <div class="carousel-item">
         <img src="assets/images/banners/c3.jpg" alt="Second slide" />
       </div>
       <div class="carousel-item">
         <img src="assets/images/banners/ks.jpg" alt="Third slide" />
       </div>
     </div>
     <a class="carousel-control-prev" href="#carousel1_indicator" role="button" data-slide="prev">
       <span class="carousel-control-prev-icon" aria-hidden="true"></span>
       <span class="sr-only">Previous</span>
     </a>
     <a class="carousel-control-next" href="#carousel1_indicator" role="button" data-slide="next">
       <span class="carousel-control-next-icon" aria-hidden="true"></span>
       <span class="sr-only">Next</span>
     </a>
   </div> 
  
   
       </div> 
       
   </div> 
   
       </div> 
   </main> 
   
   </section>
   
  
   
   
 
   <section  class="padding-bottom-sm">
   
   <header class="section-heading heading-line">
       <h4 class="title-section text-uppercase">Our Products</h4>
   </header>
   
   <div class="row row-sm">
        {products.map((data, i) => {
            return (
       <div class="col-xl-2 col-lg-3 col-md-4 col-6">
           <div class="card card-sm card-product-grid">
               <Link to="/" class="img-wrap"> <img src={"http://localhost:5000/" + data.imgpath} /> </Link>
               <figcaption class="info-wrap">
                   <a href="#" class="title">{ data.title }</a>
                   <div class="price mt-1">{getSymbolFromCurrency('INR')}{ data.price }</div>
                  <Button color="warning" value={data._id} onClick={addtocart}>Add to cart</Button>{' '}
               </figcaption>
           </div>
       </div>
       )})} 
   </div> 
   </section>
 
   <section  class="padding-bottom">
   
   <header class="section-heading heading-line">
       <h4 class="title-section text-uppercase">Trade services</h4>
   </header>
   
   <div class="row">
       <div class="col-md-4 col-sm-6">
           <article class="card card-post">
             <img src="assets/images/posts/1.jpg" class="card-img-top" />
             <div class="card-body">
               <h6 class="title">Trade Assurance</h6>
               <p class="small text-uppercase text-muted">Order protection</p>
             </div>
           </article> 
       </div>
       <div class="col-md-4 col-sm-6">
           <article class="card card-post">
             <img src="assets/images/posts/2.jpg" class="card-img-top" />
             <div class="card-body">
               <h6 class="title">Pay anytime</h6>
               <p class="small text-uppercase text-muted">Finance solution</p>
             </div>
           </article> 
       </div> 
       <div class="col-md-4 col-sm-6">
           <article class="card card-post">
             <img src="assets/images/posts/3.jpg" class="card-img-top" />
             <div class="card-body">
               <h6 class="title">Inspection solution</h6>
               <p class="small text-uppercase text-muted">Easy Inspection</p>
             </div>
           </article> 
       </div> 
   </div> 
   
   </section>

 
   
   <article class="my-4">
       {/* <img src="assets/images/banners/ad-sm.png" class="w-100" /> */}
         <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
           <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="assets/images/banners/ad-sm.png" class="d-block w-100"  alt="First slide"/>
            </div>
            <div class="carousel-item">
               <img src="assets/images/banners/ad-sm.png" class="d-block w-100"  alt="Second slide"/>
            </div>
            <div class="carousel-item">
               <img src="assets/images/banners/ad-sm.png" class="d-block w-100"  alt="Third slide"/>
            </div>
        </div>
        </div>
   </article>
   </div>  
  
   
  
   <section class="section-subscribe padding-y-lg">
   <div class="container"> 
   
   <p class="pb-2 text-center text-white">Delivering the latest product trends and industry news straight to your inbox</p>
   
   <div class="row justify-content-md-center">
       <div class="col-lg-5 col-md-6">
   <form class="form-row">
           <div class="col-md-8 col-7">
           <input class="form-control border-0" placeholder="Your Email" type="email" />
           </div>
           <div class="col-md-4 col-5">
           <button type="submit" class="btn btn-block btn-warning"> <i class="fa fa-envelope"></i> Subscribe </button>
           </div> 
   </form>
   <small class="form-text text-white-50">We’ll never share your email address with a third-party. </small>
       </div> 
   </div>
       
   
   </div>
   </section>
  
   <footer class="section-footer bg-secondary">
       <div class="container">
           <section class="footer-top padding-y-lg text-white">
               <div class="row">
                   <aside class="col-md col-6">
                       <h6 class="title">Brands</h6>
                       <ul class="list-unstyled">
                           <li> <a href="#">Adidas</a></li>
                           <li> <a href="#">Puma</a></li>
                           <li> <a href="#">Reebok</a></li>
                           <li> <a href="#">Nike</a></li>
                       </ul>
                   </aside>
                   <aside class="col-md col-6">
                       <h6 class="title">Company</h6>
                       <ul class="list-unstyled">
                           <li> <a href="#">About us</a></li>
                           <li> <a href="#">Career</a></li>
                           <li> <a href="#">Find a store</a></li>
                           <li> <a href="#">Rules and terms</a></li>
                           <li> <a href="#">Sitemap</a></li>
                       </ul>
                   </aside>
                   <aside class="col-md col-6">
                       <h6 class="title">Help</h6>
                       <ul class="list-unstyled">
                           <li> <a href="#">Contact us</a></li>
                           <li> <a href="#">Money refund</a></li>
                           <li> <a href="#">Order status</a></li>
                           <li> <a href="#">Shipping info</a></li>
                           <li> <a href="#">Open dispute</a></li>
                       </ul>
                   </aside>
                   <aside class="col-md col-6">
                       <h6 class="title">Account</h6>
                       <ul class="list-unstyled">
                           <li> <a href="#"> User Login </a></li>
                           <li> <a href="#"> User register </a></li>
                           <li> <a href="/AdminLogin"> Admin Login </a></li>
                           <li> <a href="#"> Account Setting </a></li>
                           <li> <a href="#"> My Orders </a></li>
                       </ul>
                   </aside>
                   <aside class="col-md">
                       <h6 class="title">Social</h6>
                       <ul class="list-unstyled">
                           <li><a href="#"> <i class="fab fa-facebook"></i> Facebook </a></li>
                           <li><a href="#"> <i class="fab fa-twitter"></i> Twitter </a></li>
                           <li><a href="#"> <i class="fab fa-instagram"></i> Instagram </a></li>
                           <li><a href="#"> <i class="fab fa-youtube"></i> Youtube </a></li>
                       </ul>
                   </aside>
               </div> 
           </section>	
   
           <section class="footer-bottom text-center">
           
                   <br />
             </section>
         </div>
     </footer>
        </div>
     );
}
 
export default Home;
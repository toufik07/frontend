import "./LeftSide.css";
import { useEffect, useState } from "react";
import { Button } from 'reactstrap';
import './product.css'
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import getSymbolFromCurrency from "currency-symbol-map";

const Productlist =()=>{

    let { id } = useParams();
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/api/products/list/' + id)
            .then((response) => {
                setAPIData(response.data.data.data);
            })
    }, [id])  
    
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

    refreshCart();

    return(
                  <div class="row row-sm">
                  {APIData.map((data, i) => {
                    return (
                      <div class="col-xl-2 col-lg-3 col-md-4 col-6"> 
                      <div class="card card-sm card-product-grid"> 
                        <Link class="img-wrap" to={ "/product/" + data._id }>
                            <img  src={"http://localhost:5000/" + data.imgpath}  />
                        </Link>
                        <figcaption class="info-wrap">
                        <a href="#" class="title">{ data.title }</a>
                        <div class="price mt-1">{getSymbolFromCurrency('INR')}{ data.price }</div>
                          <del><h5 style={{marginTop:"-10px", color:"red"}}>{getSymbolFromCurrency('INR')}{data.mrp}</h5></del>
                          <Button color="warning" value={data._id} onClick={addtocart}>Add to cart</Button>{' '}
                          <Button color="danger" outline>Buy now</Button>
                          </figcaption>
                      </div>  
                    </div>
                      )})}                                 
                  </div> 
               
  );
}
export default Productlist;
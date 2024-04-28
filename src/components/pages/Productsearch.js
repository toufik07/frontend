import "./LeftSide.css";
import { useEffect, useState } from "react";
import { Button } from 'reactstrap';
import './product.css'
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import getSymbolFromCurrency from "currency-symbol-map";

const Productsearch =()=>{
    const queryParams = new URLSearchParams(window.location.search);
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        let search = "";
        if(queryParams.get("search") !== null)
            search = queryParams.get("search").substring(queryParams.get("search").indexOf("="));
        axios.get('http://localhost:5000/api/products/search')
            .then((response) => {
                let data = new Array();//response.data.data.data;

                for(let i = 0; i < response.data.data.data.length; i++)
                {
                    if(response.data.data.data[i].title.toLowerCase().includes(search.toLowerCase()))
                    {
                        data.push(response.data.data.data[i]);     
                    }
                }
                if(data.length==0){
                   alert("search item was not found...");
                   window.location.href = 'http://localhost:3000/';
                }
                setAPIData(data);
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

    refreshCart();

    return(
      <div className="container">
          <div className="row">
              <div className="col-12">
                  <div className="prod">
                  {APIData.map((data, i) => {
                    return (
                      <div className="con"> 
                      <div className="con1">
                          <Link to="/">
                            <img src={"http://localhost:5000/" + data.imgpath} alt="" width="200px" style={{padding:'10px'}} /></Link>
                          <p style={{marginTop:"-10px"}}>{data.title}</p>
                          <h3 style={{marginTop:"-10px"}}>{getSymbolFromCurrency('INR')}{data.price}</h3>
                          <del><h5 style={{marginTop:"-10px", color:"red"}}>{getSymbolFromCurrency('INR')}{data.mrp}</h5></del>
                          <Button color="warning" value={data._id} onClick={addtocart}>Add to cart</Button>{' '}
                          <Button color="danger" outline>Buy now</Button>
                      </div> 
                    </div>
                      )})}                                 
                  </div> 
              </div>
          </div>
      </div>
    
  );
}
export default Productsearch;
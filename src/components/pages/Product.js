import "./LeftSide.css";
import { useEffect, useState } from "react";
import { Button } from 'reactstrap';
import './product.css'
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import getSymbolFromCurrency from "currency-symbol-map";

const Product =()=>{

    let { id } = useParams();
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/api/products/find/' + id)
            .then((response) => {
                setAPIData(response.data.data.data);
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
            <div className="card " style={{width:"400px",display: "block",
            margin:" 0 auto"}}>
            <img className="card-img-top" src={"http://localhost:5000/" + APIData.imgpath} style={{width:"200px",display: "block",
    margin:" 0 auto"}} alt="Card image" />
            {/* <div class="card-img-overlay"> */}
            <div className="card-body">
                <h4 className="card-title">{ APIData.title }</h4>
                <p className="card-text">{ APIData.description }</p>
                <h3 style={{marginTop:"-10px"}}>{getSymbolFromCurrency('INR')}{APIData.price}</h3>
                <del><h5 style={{marginTop:"-10px", color:"red"}}>{getSymbolFromCurrency('INR')}{APIData.mrp}</h5></del>
                <Button color="btn btn-primary" value={APIData._id} onClick={addtocart}>Add to cart</Button>{' '}
                <Button color="danger" outline>Buy now</Button>
                </div>
            {/* </div> */}
            </div>





        
    //   <div className="container">
    //       <div className="row">
    //<div class="padding-bottom-sm">
      //            < div class="row row-sm">
    //<div class="col-xl-2 col-lg-3 col-md-4 col-6"> 
      //                <div class="ccard card-sm card-product-grid"> 
              /* <div className="col-12">
                  <div className="prod">  */
                    //<h2>{ APIData.title }</h2>
                  //      <img src={"http://localhost:5000/" + APIData.imgpath} alt="" width="300px" style={{padding:'10px'}} />
                //    <p>{ APIData.description }</p>    
              //      <h3 style={{marginTop:"-10px"}}>{getSymbolFromCurrency('INR')}{APIData.price}</h3>
            //        <del><h5 style={{marginTop:"-10px", color:"red"}}>{getSymbolFromCurrency('INR')}{APIData.mrp}</h5></del>
          //          <Button color="warning" value={APIData._id} onClick={addtocart}>Add to cart</Button>{' '}
        //            <Button color="danger" outline>Buy now</Button>
        //        </div> 
          //    </div> 
         // </div>
      //</div>
    
  );
}
export default Product;
import "./LeftSide.css";
import { useEffect, useState } from "react";
import { Button } from 'reactstrap';
import './product.css'
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import getSymbolFromCurrency from "currency-symbol-map";
import { useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';

const Cart =()=>{

  var options = {
    "key": "rzp_live_swPK7rd1Iy42Cf",
    "amount": 0, // 2000 paise = INR 20, amount in paisa
    "name": "Shop-Chi",
    "description": "Payment Against Purchase",
    'order_id':"",
    "handler": async function(response) {
        if(response.razorpay_payment_id != null)
        {
          const regData = await axios.post('http://localhost:5000/api/orders/markpaid/' + orderid, headers);
          if(regData.data.data.status === "success")
          {
            localStorage.clear();
            alert("Order received.");
            history.push("/orders");
          } 
        }
    },
    "prefill":{
        "name":'',
        "email":'',
        "contact":'',
    },
    "notes": {
      "address": "Hello World"
    },
    "theme": {
      "color": "#528ff0"
    }
  };


  const cookies = new Cookies();
  let history = new useHistory();
  let orderid = "";
    const headers= {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }

    async function placeOrder(event){
      event.preventDefault();
      if(document.getElementById("address").value === "")
      {
        alert("Enter address");
        return;
      }
      if(document.getElementById("city").value === "")
      {
        alert("Enter city");
        return;
      }
      if(document.getElementById("pincode").value === "")
      {
        alert("Enter pincode");
        return;
      }
      let data = {
        userid:cookies.get("userid"),
        name:cookies.get("name"),
        email:cookies.get("email"),
        mobileno:cookies.get("mobileno"),
        address:document.getElementById("address").value,
        city:document.getElementById("city").value,
        pincode:document.getElementById("pincode").value,
        total:document.getElementById("divTotal").innerText,
        status:"pending",
        products:APIData
      }
      console.log(data);
      const regData = await axios.post('http://localhost:5000/api/orders', data, headers);
        console.log(regData.data);
        if(regData.data.data.status === "success")
        {
            orderid = regData.data.data.data._id;
            //options.order_id = orderid;
            options.amount = 200;//parseFloat(document.getElementById("divTotal").innerText) * 100;
            options.prefill.name = cookies.get("name");
            options.prefill.email = cookies.get("email");
            options.prefill.contact = cookies.get("mobileno");
            var rzp1 = new window.Razorpay(options);
            rzp1.open();
            //history.push("/AdminProducts");            
        }
        else{
            alert("Something went wrong")
        }

    }

    function removefromcart(event){
      event.preventDefault();
      let productid = event.target.value;
      if (window.confirm('Sure to remove?')) {
        var oldProducts = JSON.parse(localStorage.getItem("products"));
        var products = [];
        if (oldProducts != null) {
            for (var i = 0; i < oldProducts.length; i++) {
                if (productid != oldProducts[i].productid) {
                    products.push(oldProducts[i]);
                }
            }
        }
        localStorage.setItem("products", JSON.stringify(products));
        window.location.reload(true);
    } else {
        return false;
    }
    }
      
    let total = 0;
      const [APIData, setAPIData] = useState([]);
      useEffect(() => {

        let usertype = cookies.get("usertype");
        if(usertype !== "User")
        {
          history.push("/login");
        }
          axios.get('http://localhost:5000/api/products')
              .then((response) => {
                  let data = response.data.data.data;
                  var cartproducts = JSON.parse(localStorage.getItem("products"));
                  console.log(cartproducts);
                  let myproducts = new Array();
                  total = 0;
                  for(let i = 0; i < cartproducts.length; i++)
                  {
                    for(let j = 0; j < data.length; j++)
                    {
                        if(data[j]._id === cartproducts[i].productid)
                        {
                            let product = {
                                productid:data[j]._id,
                                imgpath:data[j].imgpath,
                                title:data[j].title,
                                price:data[j].price,
                                quantity:cartproducts[i].quantity,
                                total:data[j].price * cartproducts[i].quantity
                            }
                            total += product.total;
                            myproducts.push(product);
                        }
                    }
                  }
                  setAPIData(myproducts);
                  document.getElementById("divTotal").innerText = total.toFixed(2);
                  if(myproducts.length === 0)
                  {
                    history.push("/");
                  }
              })
      }, [])
  
      return (
          <div className="text-center m-5-auto container overflow">
              <h2>Cart</h2>
              <div class="table-responsive">
              <table class="table table-bordered table-stripped">
                <thead>
                  <tr>
                    <th style={{width:'80px'}}>No</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th colSpan="5">Total</th>
                    <th><div id="divTotal"></div></th>
                    <th></th>
                  </tr>
                  <tr>
                    <td colSpan="7">
                      <table class="table table-borderless">
                        <tr>
                          <td>Shipping Address</td>
                          <td>
                            <textarea id="address" class="form-control"></textarea>
                          </td>
                        </tr>
                        <tr>
                          <td>City</td>
                          <td>
                            <input type="text" id="city" class="form-control" />
                          </td>
                        </tr>
                        <tr>
                          <td>Pincode</td>
                          <td>
                            <input type="text" id="pincode" class="form-control" />
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td class="text-left">
                            <button class="btn btn-success" onClick={placeOrder}>Place Order</button>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </tfoot>
                <tbody>        
                  {APIData.map((data, i) => {
                      return (
                          <tr>
                              <td>{ i + 1 }</td>
                              <td><img  style={{height:'50px'}} src={"http://localhost:5000/" + data.imgpath} /></td>
                              <td>{ data.title }</td>
                              <td>{ data.price.toFixed(2) }</td>
                              <td>{ data.quantity }</td>
                              <td>{ data.total.toFixed(2) }</td>
                              <td><button class="btn btn-danger" value={data.productid} onClick={removefromcart}>X Remove</button></td>
                          </tr>
                    )})
                  }               
                </tbody>
              </table>
            </div>
          </div>
      )    
}
export default Cart;
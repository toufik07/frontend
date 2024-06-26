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

const Orders =()=>{
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    const cookies = new Cookies();
    let userid=cookies.get("userid");
      axios.get('http://localhost:5000/api/orders/list/' + userid)
          .then((response) => {
            console.log(response);
              setAPIData(response.data.data.data);
          })
  }, [])

      return (
          <div className="text-center m-5-auto container">
              <h2>Orders</h2>
              <div class="table-responsive">
              <table class="table table-bordered table-stripped">
                <thead>
                  <tr>
                    <th style={{width:'80px'}}>No</th>
                    <th>Date</th>
                    <th>Address</th>
                    <th>Products</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>        
                {APIData.map((data, i) => {
                    return (
                      <tr>
                        <td>{ i + 1 }</td>
                        <td>{ data.createdAt.toString().substr(0, 10) }</td>
                        <td>{ data.address + ", " + data.city + ", " + data.pincode }</td>
                        <td>
                          <table class="table table-stripped">
                            <tr>
                              <th>Product</th>
                              <th>Qty</th>
                              <th>Price</th>
                              <th>Total</th>
                            </tr>
                            {
                              data.products.map(product => {
                                return(
                                <tr>
                                  <td>{product.title}</td>
                                  <td>{product.quantity}</td>
                                  <td>{product.price}</td>
                                  <td>{product.total}</td>
                                </tr>
                            )})}
                          </table>
                        </td>
                        <td>
                          { data.status }
                        </td>
                      </tr>
                      )})}           
                </tbody>
              </table>
            </div>
          </div>
      )    
}
export default Orders;
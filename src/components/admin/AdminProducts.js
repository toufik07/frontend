import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../login.css';

export default function AdminProducts() {

    const headers= {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
  }

    function deleteProduct(event){
      event.preventDefault();
      if(window.confirm("Sure to delete?")){
        axios.delete('http://localhost:5000/api/products/' + event.target.value, headers)
            .then((response) => {
                axios.get('http://localhost:5000/api/products')
                  .then((response) => {
                      setAPIData(response.data.data.data);
                  })
            })
        }
    }
    

    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/api/products')
            .then((response) => {
                setAPIData(response.data.data.data);
            })
    }, [])

    return (
        <div className="text-center m-5-auto container">
            <h2>Products</h2>
            <p class="text-right"><Link to="/AdminProduct/0">Add Product</Link></p>
            <div class="table-responsive">
            <table class="table table-bordered table-stripped">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>No</th>
                  <th>Image</th>
                  <th>Category</th>
                  <th>Name</th>
                  <th>MRP</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>        
                {APIData.map((data, i) => {
                    return (
                        <tr>
                            <td>
                              <Link class="btn btn-primary" to={"/AdminProduct/" + data._id }>Edit</Link>
                              <button  value={data._id} onClick={deleteProduct} class="btn btn-danger">Delete</button>
                            </td>
                            <td>{ i + 1 }</td>
                            <td><img  style={{height:'50px'}} src={"http://localhost:5000/" + data.imgpath} /></td>
                            <td>{ data.category }</td>
                            <td>{ data.title }</td>
                            <td>{ data.mrp }</td>
                            <td>{ data.price }</td>
                        </tr>
                )})}               
              </tbody>
            </table>
          </div>
        </div>
    )    
}
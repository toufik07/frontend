import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../login.css';

export default function AdminCategories() {

    const headers= {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
  }

    function deleteCategory(event){
      event.preventDefault();
      if(window.confirm("Sure to delete?")){
        axios.delete('http://localhost:5000/api/categories/' + event.target.value, headers)
            .then((response) => {
                axios.get('http://localhost:5000/api/categories')
                  .then((response) => {
                      setAPIData(response.data.data.data);
                  })
            })
        }
    }
    

    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/api/categories')
            .then((response) => {
                setAPIData(response.data.data.data);
            })
    }, [])

    return (
        <div className="text-center m-5-auto container">
            <h2>Categories</h2>
            <p class="text-right"><Link to="/AdminCategory/0">Add Category</Link></p>
            <div class="table-responsive">
            <table class="table table-bordered table-stripped">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>No</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>        
                {APIData.map((data, i) => {
                    return (
                        <tr>
                            <td>
                              <Link class="btn btn-primary" to={"/AdminCategory/" + data._id }>Edit</Link>
                              <button  value={data._id} onClick={deleteCategory} class="btn btn-danger">Delete</button>
                            </td>
                            <td>{ i + 1 }</td>
                            <td>{ data.name }</td>
                        </tr>
                )})}               
              </tbody>
            </table>
          </div>
        </div>
    )    
}
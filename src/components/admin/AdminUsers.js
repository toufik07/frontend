import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../login.css';

export default function AdminUsers() {

    const headers= {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
  }
    

    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/api/users')
            .then((response) => {
                setAPIData(response.data.data.data);
            })
    }, [])

    return (
        <div className="text-center m-5-auto container">
            <h2>Users</h2>
            <div class="table-responsive">
            <table class="table table-bordered table-stripped">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile no</th>
                </tr>
              </thead>
              <tbody>        
                {APIData.map((data, i) => {
                    return (
                        <tr>
                            <td>{ i + 1 }</td>
                            <td>{ data.name }</td>
                            <td>{ data.email }</td>
                            <td>{ data.mobileno }</td>
                        </tr>
                )})}               
              </tbody>
            </table>
          </div>
        </div>
    )    
}
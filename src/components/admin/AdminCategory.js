import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'

import '../../login.css'

export default function AdminCategory() {

    let history = new useHistory();
    const [name,setname]=useState("");

    const headers= {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
    let { id } = useParams();

    useEffect(()=>{
      if(id !== "0")
      {
        axios.get('http://localhost:5000/api/categories/find/' + id)
          .then((response) => {
            console.log(response);
              let category = response.data.data.data;
              setname(category.name);
          })
      }
    }, []);

    const save = async(event) =>{
        event.preventDefault();
        const data={
          name:name,
      }
      if(id === "0"){
        const regData =await axios.post('http://localhost:5000/api/categories', data, headers);
        console.log(regData.data);
        if(regData.data.data.status === "success")
        {
            history.push("/AdminCategories");
        }
        else{
            alert("Something went wrong")
        }
      }
      else{
        axios.put('http://localhost:5000/api/categories/' + id, data, headers)
            .then((response) => {
              history.push("/AdminCategories");
            })
      }
    }

    return (
        <div class="container">
            <h2>Category</h2>
              <div class="row">
            <div class="col-md-12 text-left">
                <input type="hidden" formControlName="id"></input>
                <div class="row">
                  <div class="col-lg-8">
                    <div class="form-group">
                        <label class="info-title">Name <span>*</span></label>
                        <input class="form-control" type="text" value={name} onChange={(event)=>{setname(event.target.value)}} required />
                    </div>
                  </div>            
              </div>
              <button type="submit" onClick={save} class="btn btn-success">Save</button>
            </div>
          </div>
        </div>
    )
}

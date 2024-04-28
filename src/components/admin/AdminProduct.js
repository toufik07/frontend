import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'

import '../../login.css'

export default function AdminProduct() {

  const [categories, setCategoriesData] = useState([]);

    let history = new useHistory();
    const [category,setcategory]=useState("Fashion");
    const [title,settitle]=useState("");
    const [description,setdescription]=useState("");
    const [imgcontent,setimgcontent]=useState("");
    const [mrp,setmrp]=useState("");
    const [price,setprice]=useState("");

    const headers= {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
    let { id } = useParams();

    useEffect(()=>{
      axios.get('http://localhost:5000/api/categories')
      .then((response) => {
          setCategoriesData(response.data.data.data);
      })
      if(id !== "0")
      {
        axios.get('http://localhost:5000/api/products/find/' + id)
          .then((response) => {
              let product = response.data.data.data;
              setcategory(product.category);
              settitle(product.title);
              setdescription(product.description);
              setmrp(product.mrp);
              setprice(product.price);
          })
      }
    }, []);

    const save = async(event) =>{
        event.preventDefault();
        const data={
          category:category,
          title:title,
          description:description,
          imgcontent:imgcontent,
          imgppath:"",
          mrp:mrp,
          price:price,
      }
      if(id === "0"){
        const regData =await axios.post('http://localhost:5000/api/products', data, headers);
        console.log(regData.data);
        if(regData.data.data.status === "success")
        {
            history.push("/AdminProducts");
        }
        else{
            alert("Something went wrong")
        }
      }
      else{
        axios.put('http://localhost:5000/api/products/' + id, data, headers)
            .then((response) => {
              history.push("/AdminProducts");
            })
      }
    }

    var imageChanged = async(event)=>{
      event.preventDefault();
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if(reader.result != null)
        {
          setimgcontent(reader.result.toString());
          document.getElementById("imgcontent").value = reader.result.toString();
        }
      };
    }

    return (
        <div class="container">
            <h2>Product</h2>
              <div class="row">
            <div class="col-md-12 text-left">
                <input type="hidden" formControlName="id"></input>
                <div class="form-group">
                    <label>Category <span>*</span></label>
                    <select class="form-control" value={category} onChange={(event)=>{setcategory(event.target.value)}} >
                    {categories.map((data, i) => {
                      return (
                        <option value={ data.name }>{ data.name }</option>
                  )})}  
                    </select>
                </div>
                <div class="row">
                  <div class="col-lg-8">
                    <div class="form-group">
                        <label class="info-title">Name <span>*</span></label>
                        <input class="form-control" type="text" value={title} onChange={(event)=>{settitle(event.target.value)}} required />
                        <input class="form-control" id="imgcontent" type="hidden" value={imgcontent} onChange={(event)=>{setimgcontent(event.target.value)}} required />
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="form-group">
                        <label class="info-title">Picture</label>
                        <input class="form-control" onChange={imageChanged} type="file" required />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="info-title">Description <span>*</span></label>
                  <textarea class="form-control" value={description} onChange={(event)=>{setdescription(event.target.value)}} ></textarea>
              </div>
              <div class="row">
                <div class="col-lg-4">
                    <div class="form-group">
                      <label class="info-title">MRP<span>*</span></label>
                      <input class="form-control" type="number" value={mrp} onChange={(event)=>{setmrp(event.target.value)}} ></input>
                  </div>
                </div>
                <div class="col-lg-4">
                    <div class="form-group">
                      <label class="info-title">Price<span>*</span></label>
                      <input class="form-control" type="number" value={price} onChange={(event)=>{setprice(event.target.value)}} ></input>
                  </div>
                </div>              
              </div>
              <button type="submit" onClick={save} class="btn btn-success">Save</button>
            </div>
          </div>
        </div>
    )
}

import axios from 'axios'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import '../../register.css'

export default function SignUpPage() {

    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const [mobileno,setMobileNo]=useState("");

    const history = useHistory();

    const headers= {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
    const register = async(event) =>{
        event.preventDefault();
        const data={
            name:name,
            email:email,
            mobileno:mobileno,
            password:password
        }
        console.log("Form data:",data);
        if(name === "")
        {
            alert("Enter name");
            return;
        }
        if(email === "")
        {
            alert("Enter email");
            return;
        }
        if(mobileno === "")
        {
            alert("Enter mobile no");
            return;
        }
        if(password === "")
        {
            alert("Enter password");
            return;
        }
        const regData =await axios.post(`http://localhost:5000/api/auth/register`,data,headers);

        console.log(regData);
        if(regData.data){
           // console.log(regData);
            alert("Registered successfully....")
            history.push('/login');
        }else{
            alert("user not registered.. Try Again")
        }
    }
    return (
        <div className="text-center m-5-auto">
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
            <form action="/home">
                <p>
                    <label>Name</label><br/>
                    <input type="text" value={name} onChange={(event)=>{setName(event.target.value)}} required />
                </p>
                <p>
                    <label>Email address</label><br/>
                    <input type="email" value={email} onChange={(event)=>{setEmail(event.target.value)}} required />
                </p>
                <p>
                    <label>Mobile no</label><br/>
                    <input type="text" value={mobileno} onChange={(event)=>{setMobileNo(event.target.value)}} required />
                </p>
                <p>
                    <label>Password</label><br/>
                    <input type="password" value={password} onChange={(event)=>{setPassword(event.target.value)}} required />
                </p>
                <p>
                    <button id="sub_btn" type="submit" onClick={register}>Register</button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )

}

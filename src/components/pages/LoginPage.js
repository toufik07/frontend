import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';

//import '../../login.css'

export default function SignInPage() {

    const [username,setUserName]=useState("");
    const [password,setPassword]=useState("");

    const headers= {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }

    const login = async(event) =>{
        event.preventDefault();
        const data={
            username:username,
            password:password
        }
        //console.log("Form data:",data);
        const regData =await axios.post('http://localhost:5000/api/auth/login', data, headers);
        if(regData.data.data.status === "fail")
        {
            alert("Invalid credentials");
        }
        else{
            console.log(regData.data);
            const cookies = new Cookies();
            cookies.set('usertype', 'User', { path: '/' });            
            cookies.set('userid', regData.data.data.data._id, { path: '/' });
            cookies.set('name', regData.data.data.data.name, { path: '/' });
            cookies.set('email', regData.data.data.data.email, { path: '/' });
            cookies.set('mobileno', regData.data.data.data.mobileno, { path: '/' });
            window.location.replace("/Cart");
        }
    }

    return (
        <div className="text-center m-5-auto" style={{display: "inline-block",
            background: "#fcb700",
            border: "1px solid #ddd",
            borderradius: "2px",
            padding: "2rem",
            margin: "2rem 0 1rem 0"}}>
            <h2>Sign in to us</h2>            
                <p>
                    <label>Email</label><br/>
                    <input type="text" value={username} onChange={(event)=>{setUserName(event.target.value)}} required />
                </p>
                <p>
                    <label>Password</label>
                    <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
                    <br/>
                    <input type="password" value={password} onChange={(event)=>{setPassword(event.target.value)}} required />
                </p>
                <p>
                    <button id="sub_btn" type="submit" onClick={login}>Login</button>
                </p>
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}

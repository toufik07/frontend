import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

import '../../login.css'

export default function SignInPage() {

    let history = new useHistory();
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
        const regData =await axios.post('http://localhost:5000/api/auth/adminlogin', data, headers);
        if(regData.data.data.status === "success")
        {
            const cookies = new Cookies();
            cookies.set('usertype', 'Admin', { path: '/' });
            window.location.replace("/AdminProducts");
        }
        else{
            alert("Invalid credentials");
        }
    }

    return (
        <div className="text-center m-5-auto">
            <h2>Admin Login</h2>            
                <p>
                    <label>Username</label><br/>
                    <input type="text" value={username} onChange={(event)=>{setUserName(event.target.value)}} required />
                </p>
                <p>
                    <label>Password</label>
                    <br/>
                    <input type="password" value={password} onChange={(event)=>{setPassword(event.target.value)}} required />
                </p>
                <p>
                    <button id="sub_btn" type="submit" onClick={login}>Login</button>
                </p>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}

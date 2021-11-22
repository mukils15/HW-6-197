import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    Link
  } from "react-router-dom";

  import axios from 'axios'

const Login = () => {
    const [username, SetName] = useState('');
    const [password, setPass] = useState('');
    const [succeeded, setSucc] = useState(false);
    let navigate = useNavigate();

    const logAttempt = async () => {
        const { data } = await axios.post('/account/login', null, { params : {username: username, password: password}});
        if (data === "Signed in"){
            setSucc(true);
            navigate("/");
        } else {
            alert("Some error occured! Try again");
        }
    }

    return (
        <div className="container">
            <h1> Log In </h1>
            <p> Please fill out this form to log-in</p>
            <hr>
            </hr>
            <label for="username"><b>Username</b></label>
            <input onChange={e=> SetName(e.target.value)} type="text" placeholder="Enter username" name ="username" required></input>
            <br>
            </br>
            <label for="password"><b>Password</b></label>
            <input onChange={e=> setPass(e.target.value)} type="text" placeholder="Enter password" name ="password" required></input>
            <div className = "clearfix">
                <button onClick={logAttempt} type = "button" className="signupbtn">Log-in</button>
            </div>
            <br></br>
            Don't have an account?
            <Link to="/signup">Sign-up here</Link>
        </div>
    )

}

export default Login;
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    Link
  } from "react-router-dom";

  import axios from 'axios'

  import Button from 'react-bootstrap/Button';
  import 'bootstrap/dist/css/bootstrap.min.css';

const SignUp = () => {
    const [username, SetName] = useState('');
    const [password, setPass] = useState('');
    const [succeeded, setSucc] = useState(false);
    let navigate = useNavigate();

    const register = async () => {
        const { data } = await axios.post('/account/signup', null, { params : {
            username: username, 
            password: password}});
        if (data === "Added user!"){
            setSucc(true);
            navigate("/");
        } else {
            alert("Some error occured! Try again");
        }
    }


    return (
        <div className="container">
            <h1> Sign Up </h1>
            <p> Please fill out this form to create an account!</p>
            <hr>
            </hr>
            <label for="username"><b>Username: </b></label>
            <input onChange={e=> SetName(e.target.value)} type="text" placeholder="Enter username" name ="username" required></input>
            <br>
            </br>
            <hr>
            </hr>
            <label for="password"><b>Password: </b></label>
            <input onChange={e=> setPass(e.target.value)} type="text" placeholder="Enter password" name ="password" required></input>
            <br>
            </br>
            <hr>
            </hr>
            <div className = "clearfix">
                <button onClick={register} variant="success" type = "button" className="btn btn-success w-50">Submit</button>
            </div>
            <br></br>
            Already have an account?
            <Link to="/login">Log-in here</Link>
        </div>
    )
}

export default SignUp;
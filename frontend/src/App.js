import React, { useState, useEffect } from 'react';
import Login from './Login';
import SignUp from './SignUp'
import {BrowserRouter} from 'react-router-dom'
import { Route, Routes } from 'react-router-dom';
import {
    Link
  } from "react-router-dom";

const App = () => {
    return (
            <div>
                Homepage!
                <nav>
                    <Link to="/login">To Login</Link>
                    <br>
                    </br>
                    <Link to="/signup">To Signup</Link>
                </nav>
            </div>
    )
}

export default App;
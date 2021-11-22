import React from 'react'
import ReactDOM from 'react-dom'
import App from './src/App'
import Login from './src/Login';
import SignUp from './src/SignUp'
import {BrowserRouter} from 'react-router-dom'
import { Route, Routes } from 'react-router-dom';
import MainPage from './src/main'


ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<MainPage/>}></Route>
            <Route exact path="login" element={<Login/>}/>
            <Route exact path= "signup" element={<SignUp/>}/>
        </Routes>
    </BrowserRouter>,
    document.getElementById('react-root'))
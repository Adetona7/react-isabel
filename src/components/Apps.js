import React from 'react';
import "./app.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Addstaff from './Addstaff';
import Viewstaff from './Viewstaff';
import Register from './Register';
import Login from './Login';
import axios from 'axios';
axios.defaults.baseURL = "http://127.0.0.1:8000/";


export default function App() {    
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/viewstaff/:id" element={<Viewstaff />} ></Route>
                <Route path='/addstaff' element={<Addstaff />} ></Route>
                <Route path='/home' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='*' element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}
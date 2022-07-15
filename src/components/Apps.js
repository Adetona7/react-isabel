import React from 'react';
import "./app.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Addstaff from './Addstaff';
import Viewstaff from './Viewstaff';
import Register from './Register';
import Activitylog from './Activitylog';
import Login from './Login';
import Image from './Image';
import axios from 'axios';
import Viewform from './Viewform';

axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config){
    const token = localStorage.getItem('access_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
})

export default function App() {    
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/viewstaff/:id" element={<Viewstaff />} ></Route>
                <Route path='/addstaff' element={<Addstaff />} ></Route>
                <Route path='/home' element={<Home />} />
                <Route path='/activitylog' element={<Activitylog />} />
                <Route path='/register' element={<Register />} />
                <Route path='/image/:id' element={<Image />} />
                <Route path='*' element={<Login />} />
                <Route path='/' element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}
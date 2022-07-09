import React from 'react';
import "./app.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Addstaff from './Addstaff';
import Editstaff from './Editstaff';
import axios from 'axios';
axios.defaults.baseURL = "http://127.0.0.1:8000/";


export default function App() {    
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/editstaff/:id" element={<Editstaff />} ></Route>
                <Route path='/addstaff' element={<Addstaff />} ></Route>
                <Route path='/about' element={<Home />} />
                <Route path='*' element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}
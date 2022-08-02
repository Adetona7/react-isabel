import React, { useState } from 'react';
import "./app.css";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setLogin({...loginInput, [e.target.name]: e.target.value })
    }
    const loginSubmit = (e) => {
        e.preventDefault();
        axios.get('/sanctum/csrf-cookie').then(response => {
        var axios = require('axios');
        var FormData = require('form-data');
        var data = new FormData();
        data.append('email', loginInput.email);
        data.append('password', loginInput.password);

        var config = {
        method: 'post',
        url: 'http://localhost:8000/api/login',
        headers: { 
            'Accept': 'application/json', 

        },
        data : data
        };

        axios(config)
        .then(response => {
        console.log(response);

        if(response.data.status === 200){
            localStorage.setItem('access_token', response.data.token);
            localStorage.setItem('auth_name', response.data.username);
            Swal.fire("Successful",response.data.message,"success");
            navigate('/home');
        }
        else if(response.data.status === 401){
            Swal.fire("Error",response.data.message,"error");
        }
        else if(response.data.status === 422){
            setLogin({...loginInput, error_list: response.data.validate_err });
        }
        }).catch(err => {
            console.log(err.response.data.validate_err)
        });
    });
    }

    return(
        <div className="container m-auto">    
            <div className='display-3 mb-4'>Login Form</div>
                <div className="ui form">
                    <form onSubmit={loginSubmit}>         
                        <div className="field">
                        <label>E-Mail</label>
                        <input type="email" placeholder="joe@gmail.com" name="email" onChange={handleInput} value={loginInput.email} />
                        <span className="ui red">{loginInput.error_list.email}</span>
                        </div>

                        <div className="field">
                        <label>Password</label>
                        <input type="password" placeholder="Enter password" name="password" onChange={handleInput} value={loginInput.password} /> 
                        <span className="ui red">{loginInput.error_list.password}</span>
                        </div>

                        <button type="submit" className="btn btn-primary">Login</button>

                        <p className='mt-2'>Or <a href="/register">Register</a></p>
                        
                    </form>
                </div>
        </div>  

    );

}
export default Login;

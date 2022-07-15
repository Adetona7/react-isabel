import React, { useState } from 'react';
import "./app.css";
import swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";


function Register() {
    const navigate = useNavigate();
    const [registerInput, setUser] = useState({
        name: '',
        email: '',
        password: '',
        error_list: [],
    });
    const [errorMessages, setErrorMessages] = useState({})

    const handleInput = (e) => {
        e.persist();
        setUser({...registerInput, [e.target.name]: e.target.value })
    }

    const registerUser = (e) => {
        e.preventDefault();
        var axios = require('axios');
        var data = new FormData();
        data.append('name', registerInput.name);
        data.append('email', registerInput.email);
        data.append('password', registerInput.password);
        
        var config = {
          method: 'post',
          url: 'http://127.0.0.1:8000/api/register',
          headers: { 
            'Content-Type': 'application/json',
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
          console.log(response);

        if(response.status === 200){
            swal.fire("Sucessful",response.data.message,"success");
            setUser({
                name: '',
                email: '',
                password: '',
                errorMessages: []
            });
            navigate('/');
            
        }
        else if(response.status === 401)
        {
            swal.fire("Warning",response.data.message,"warning");
            console.log(response)
            setUser({...registerInput, error_list: response.data.validate_err });
        }
        }).catch(err => {
            setErrorMessages(err.response.data.validate_err)
        });
    }


    return(
        <div className="container">   
        <div className='display-3 mb-3 center'>Registration Form</div>         
            <div className="ui form">
                <form className='w-50' onSubmit={registerUser}>         
                    <div className="field">
                    <label>Name</label>
                    <input type="text" placeholder="Enter your name" name="name" onChange={handleInput} value={registerInput.name} required/>
                    <span className="ui red">{errorMessages?.name}</span>
                    </div>

                    <div className="field">
                    <label>E-Mail</label>
                    <input type="email" placeholder="joe@gmail.com" name="email" onChange={handleInput} value={registerInput.email} required/>
                    <span className="ui red">{errorMessages?.email}</span>
                    </div>

                    <div className="field">
                    <label>Password</label>
                    <input type="password" placeholder="Enter password" name="password" onChange={handleInput} value={registerInput.password} required/> 
                    <span className="ui red">{errorMessages?.password}</span>
                    </div>

                    <button type="submit" className="btn btn-primary">Register</button>

                    <p className='mt-2'>Already registered? <a href="/login">Login</a></p>
                </form>
            </div>
        </div>  

    );

}
export default Register;

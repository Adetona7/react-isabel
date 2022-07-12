import React, { useState } from 'react';
import "./app.css";


function Register() {

    return(
        <div className="container">   
        <div className='display-3 mb-3 center'>Registration Form</div>         
            <div className="ui form">
                <form className='w-50'>         
                    <div className="field">
                    <label>Name</label>
                    <input type="text" placeholder="Enter your name" name="name" required/>
                    {/* <span className="ui red">{errorMessages?.email}</span> */}
                    </div>

                    <div className="field">
                    <label>E-Mail</label>
                    <input type="email" placeholder="joe@gmail.com" name="email" required/>
                    {/* <span className="ui red">{errorMessages?.email}</span> */}
                    </div>

                    <div className="field">
                    <label>Password</label>
                    <input type="password" placeholder="Enter password" name="password" required/> 
                    {/* <span className="ui red">{errorMessages?.password}</span> */}
                    </div>

                    <button type="submit" className="btn btn-primary">Register</button>

                    <p className='mt-2'>Already registered? <a href="/login">Login</a></p>
                </form>
            </div>
        </div>  

    );

}
export default Register;

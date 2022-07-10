import React, { useState } from 'react';
import "./app.css";


function Login() {


    return(
        <div className="ui container body">    
            <div className='display-3 mb-4 center'>Login Form</div>
                <div className="ui form">
                    <form>         
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

                        <button type="submit" className="btn btn-primary">Login</button>

                        <p className='mt-2'>Or <a href="/register">Register</a></p>
                    </form>
                </div>
        </div>  

    );

}
export default Login;

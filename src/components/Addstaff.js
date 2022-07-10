import React, { useState } from 'react';
import "./app.css";
import swal from 'sweetalert2';
import axios from 'axios';

function Addstaff() {
    const [staffInput, setStaff] = useState({
        // staffid: '',
        fname: '',
        lname: '',
        phone: '',
        email: '',
        password: '',
        // image_name: '',
        error_list: [],
    });
    const [errorMessages, setErrorMessages] = useState({})

    const handleInput = (e) => {
        e.persist();
        setStaff({...staffInput, [e.target.name]: e.target.value })
    }

    const saveStaff = (e) => {
        e.preventDefault();
        var axios = require('axios');
        var data = new FormData();
        // data.append('staffid', staffInput.staffid);
        data.append('fname', staffInput.fname);
        data.append('lname', staffInput.lname);
        data.append('phone', staffInput.phone);
        data.append('email', staffInput.email);
        data.append('password', staffInput.password);
        // data.append('image_name', staffInput.image_name);
        
        var config = {
          method: 'post',
          url: 'http://127.0.0.1:8000/api/staff/register',
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
            setStaff({
                // staffid: '',
                fname: '',
                lname: '',
                phone: '',
                email: '',
                password: '',
                // image_name: '',
                errorMessages: []
            })
            
        }
        else if(response.status === 400)
        {
            // swal.fire("Error",response.data.message,"error");
            console.log(response)
            setStaff({...staffInput, error_list: response.data.validate_err });
        }
        }).catch(err => {
            // console.log(err.response.data.validate_err)
            setErrorMessages(err.response.data.validate_err)
        });
    }


    return (
        <div className="design">
            <div className="ui fixed inverted menu">
                <div className="ui container">                
                    <p className="header item">Registration Form</p>
                    <a className='ui primary button' href='/Home'>Go back</a>                                               
                </div>
            </div>
            
            <div className="ui container body">            
                <div className="ui form">
                    <form onSubmit={saveStaff}> 

                        {/* <div className="field"> 
                        <label>Upload Image</label>			          
                        <input type="file" name="image_name" onChange={handleInput} value={staffInput.image_name} />
                        <span className="ui red">{errorMessages?.image_name}</span>
                        </div> */}

                        <div className="field">
                        <label>First Name</label>   				         
                        <input type="text" placeholder="Enter first name" name="fname" onChange={handleInput} value={staffInput.fname} required/>
                        <span className="ui red">{errorMessages?.fname}</span>
                        </div>

                        <div className="field">
                        <label>Last Name</label>
                        <input type="text" placeholder="Enter last name" name="lname" onChange={handleInput} value={staffInput.lname} required/>
                        <span className="ui red">{errorMessages?.lname}</span>
                        </div>

                        <div className="field">
                        <label>Phone Number</label>
                        <input type="text" placeholder="Enter phone number" name="phone" onChange={handleInput} value={staffInput.phone} required/>
                        <span className="ui red">{errorMessages?.phone}</span>
                        </div>

                        <div className="field">
                        <label>E-Mail</label>
                        <input type="email" placeholder="joe@gmail.com" name="email" onChange={handleInput} value={staffInput.email} required/>
                        <span className="ui red">{errorMessages?.email}</span>
                        </div>

                        <div className="field">
                        <label>Password</label>
                        <input type="password" placeholder="Enter password" name="password" onChange={handleInput} value={staffInput.password} required/> 
                        <span className="ui red">{errorMessages?.password}</span>
                        </div>  

                        <button type="submit" className="btn btn-primary">Save Staff</button>

                    </form>
                </div>                    
            </div>    
        </div>
        );
}
export default Addstaff;

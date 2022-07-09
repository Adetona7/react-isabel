import React, { Component, useState } from 'react';
import "./app.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';


function Editform(props) {
    
    const [staffInput, setStaff] = useState([]);
    const [errorInput, setError] = useState([]);
    const { id } = useParams();
    const handleInput = (e) => {
        e.persist();
        setStaff({...staffInput, [e.target.name]: e.target.value });
    }

    const updateStaff = (e) => {
        e.preventDefault();
        var axios = require('axios');
        var FormData = require('form-data');
        var data = new FormData();
        data.append('fname', staffInput.fname);
        data.append('lname', staffInput.lname);
        data.append('phone', staffInput.phone);
        data.append('email', staffInput.email);

        var config = {
        method: 'put',
        url: `http://127.0.0.1:8000/api/staffupdate/${id}`,
        headers: { 
            'Accept': 'application/json', 
        },
        data : data
        };
        
        axios(config)
        .then(function (response) {
        console.log(response);
            if(response.data.status === 200){
            Swal.fire("Success",response.data.message,"success");
            }
            else if(response.data.status === 404){
                Swal.fire("Error",response.data.message,"error");
            }
        })
        .catch(function (error) {
        console.log(error);
        });

    }

        const {staffid, fname, lname, phone, email} = props.staff;

        return(
            <form onSubmit={updateStaff}> 
                <div className="field"> 
                <label>Staff Id: {staffid}</label>		          
                </div>

                <div className="field">
                <label>First Name</label>   				         
                <input type="text" placeholder="Enter first name" name="fname" defaultValue={fname} onChange={handleInput} value={staffInput.fname} required/>
                <span className="ui red"></span>
                </div>

                <div className="field">
                <label>Last Name</label>
                <input type="text" placeholder="Enter last name" name="lname" defaultValue={lname} onChange={handleInput} value={staffInput.lname} required/>
                <span className="ui red"></span>
                </div>

                <div className="field">
                <label>Phone Number</label>
                <input type="text" placeholder="Enter phone number" name="phone" defaultValue={phone} onChange={handleInput} value={staffInput.phone} required/>
                <span className="ui red"></span>
                </div>

                <div className="field">
                <label>E-Mail</label>
                <input type="email" placeholder="joe@gmail.com" name="email" defaultValue={email} onChange={handleInput} value={staffInput.email} required/>
                <span className="ui red"></span>
                </div>
                                                                           
                <button type="submit" className="ui primary button">Update Staff</button>

            </form>
        );
    }
    
export default Editform



    //     axios(config)
    //     .then(function (response) {
    //         console.log(response);

    //         if(response.data.status === 200){
    //             Swal.fire("Success",response.data.message,"success");
    //             setError([]);
    //         }
    //         else if(response.data.status === 422){
    //             Swal.fire("All fields are mandetory","","error");
    //             setError(response.data.validate_err);
    //         }
            // else if(response.data.status === 404){
            //     Swal.fire("Error",response.data.message,"error");
            // }
    //     });

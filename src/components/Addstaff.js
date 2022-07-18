import React, { useState } from 'react';
import "./app.css";
import swal from 'sweetalert2';
import { useNavigate, useParams } from "react-router-dom";


function Addstaff() {
    const navigate = useNavigate();
    // const { id } = useParams();
    // console.log(id)
    const [staffInput, setStaff] = useState({
        fname: '',
        lname: '',
        gender: '',
        sec: '',
        subject: '',
        phone: '',
        email: '',
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
        data.append('fname', staffInput.fname);
        data.append('lname', staffInput.lname);
        data.append('gender', staffInput.gender);
        data.append('sec', staffInput.sec);
        data.append('subject', staffInput.subject);
        data.append('phone', staffInput.phone);
        data.append('email', staffInput.email);
        
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
                fname: '',
                lname: '',
                gender: '',
                sec: '',
                subject: '',
                phone: '',
                email: '',
                errorMessages: []
            });
            navigate(`/home`);
            
        }
        else if(response.status === 401)
        {
            swal.fire("Warning",response.data.message,"warning");
            console.log(response)
            setStaff({...staffInput, error_list: response.data.validate_err });
        }
        }).catch(err => {
            setErrorMessages(err.response.data.validate_err)
        });
    }

    return (
        <div className="design">
            <div className="ui fixed inverted menu">
                <div className="container">                
                    <p className="header item">Isabel College</p>
                    <a className='ui primary button' href='/Home'>Go back</a>                                               
                </div>
            </div>
            <p className="display-4 center body">Registration Form</p>
            
            <div className="ui container">            
                <div className="ui form">
                    <form onSubmit={saveStaff}> 

                        <div className="field">
                        <label>First Name</label>   				         
                        <input type="text" placeholder="Enter first name" name="fname" onChange={handleInput} value={staffInput.fname} />
                        <span className="ui red">{errorMessages?.fname}</span>
                        </div>

                        <div className="field">
                        <label>Last Name</label>
                        <input type="text" placeholder="Enter last name" name="lname" onChange={handleInput} value={staffInput.lname} />
                        <span className="ui red">{errorMessages?.lname}</span>
                        </div>

                        <div className="field">
                        <label>Gender</label>
                        <input type="text" placeholder="M/F" name="gender" onChange={handleInput} value={staffInput.gender} />
                        <span className="ui red">{errorMessages?.gender}</span>
                        </div>

                        <div className="field">
                        <label>Section</label>
                        <input type="text" placeholder="admin, academic, others" name="sec" onChange={handleInput} value={staffInput.sec} />
                        <span className="ui red">{errorMessages?.sec}</span>
                        </div>

                        <div className="field">
                        <label>Subject/Position</label>
                        <input type="text" placeholder="secretary, mathematics, ....." name="subject" onChange={handleInput} value={staffInput.subject} />
                        <span className="ui red">{errorMessages?.subject}</span>
                        </div>

                        <div className="field">
                        <label>Phone Number</label>
                        <input type="text" placeholder="Enter phone number" name="phone" onChange={handleInput} value={staffInput.phone} />
                        <span className="ui red">{errorMessages?.phone}</span>
                        </div>

                        <div className="field">
                        <label>E-Mail</label>
                        <input type="email" placeholder="joe@gmail.com" name="email" onChange={handleInput} value={staffInput.email} />
                        <span className="ui red">{errorMessages?.email}</span>
                        </div>

                        <button type="submit" className="btn btn-primary">Save Staff</button>

                    </form>
                </div>                    
            </div>    
        </div>
        );
}
export default Addstaff;

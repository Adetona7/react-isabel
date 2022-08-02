import React, { useState } from 'react';
import "./app.css";
import swal from 'sweetalert2';
import { useNavigate, useParams } from "react-router-dom";
import Sidenav from './Sidenav';


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
            <Sidenav/>
            <div className="row">
                <div className="ui fixed inverted menu pb-2 pt-2 bg-light">
                    <div className="container"> 
                        <div className="col-md-8">
                            <p className="header item text-black">ISABEL COLLEGE</p>
                        </div>

                        <div className="col-md-2">
                            {/* <i className="fa-solid fa-circle-user fa-2x me-2 pt-2 float-end"></i> */}
                            <img src="https://lh3.googleusercontent.com/ogw/AOh-ky1Wa8eg4WM3rGGkWwMNvFSdhvOmAfW0ZHLSQ8Kr7w=s32-c-mo" alt="" width="32" height="32" class="rounded-circle me-2 float-end" />
                        </div>

                        <div className="col-md-2">
                            <div className="">
                                <p><b>Adetona Oluwabukunmi.<p>Developer.</p></b></p>
                            </div>                              
                        </div>

                    </div>               
                </div>
            </div>
            <p className="display-4 center body">Register Here</p>
            <p className='center'>Enter your informations to be registered. <b>ALL</b> fields are required</p>
            
            <div className="ui container">            
                <div className="ui form">
                    <form onSubmit={saveStaff} className="m-auto"> 
                        <div className='row'>

                            <p className='text-warning'>Please fill correctly!</p>
                            <div className="field col">
                            <label>First Name</label>   				         
                            <input type="text" placeholder="Enter first name" name="fname" onChange={handleInput} value={staffInput.fname} />
                            <span className="ui red">{errorMessages?.fname}</span>
                            </div>

                            <div className="field col">
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

                            <div className="field col">
                            <label>Phone Number</label>
                            <input type="text" placeholder="Enter phone number" name="phone" onChange={handleInput} value={staffInput.phone} />
                            <span className="ui red">{errorMessages?.phone}</span>
                            </div>

                            <div className="field col">
                            <label>E-Mail</label>
                            <input type="email" placeholder="joe@gmail.com" name="email" onChange={handleInput} value={staffInput.email} />
                            <span className="ui red">{errorMessages?.email}</span>
                            </div>

                            <button type="submit" className="btn btn-primary">Save Staff</button>

                        </div>
                        
                    </form>
                </div>                    
            </div>    
        </div>
        );
}
export default Addstaff;

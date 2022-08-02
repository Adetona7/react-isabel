import React, {useState, useEffect} from 'react';
import "./app.css";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert2';
import Loader from './Loader';
import Sidenav from './Sidenav';

function Editstaff() {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const [staffInput, setStaff] = useState([]);
    const [errorInput, setError] = useState([]);
    const { id } = useParams()
    console.log(id)

    useEffect(() => {
        axios.get(`http://localhost:8000/api/findstaffid/${id}`).then( response => {
            if(response.data.status === 200){
                setStaff(response.data.staff);
                setLoader(false);
            }
            else if(response.data.status === 404){
                swal.fire("Error",response.data.message,"error");
                navigate('/viewstaff');
            }
        });

    }, [ ]);

    const handleInput = (e) => {
        e.persist();
        setStaff({...staffInput, [e.target.name]: e.target.value });
    }

    const updateStaff = (e) => {
        e.preventDefault()
        var axios = require('axios');
        var data = new FormData();
        data.append('fname', staffInput.fname);
        data.append('lname', staffInput.lname);
        data.append('phone', staffInput.phone);
        data.append('email', staffInput.email);
        
        var config = {
            method: 'post',
            url: `http://localhost:8000/api/staffupdate/${id}`,
            headers: { 
            'Content-Type': 'application/json',
            },
            data : data
        };
        
        axios(config)
        .then(function (response) {
        console.log(response);
            if(response.data.status === 200){
                swal.fire("Success",response.data.message,"success");
                setError([]);
                navigate(`/viewstaff/${id}`);
            }
            else if(response.data.status === 422){
                swal.fire("All fields are mandetory","","error");
                setError(response.data.validate_err);
            }
            else if(response.data.status === 404){
                swal.fire("Error",response.data.message,"error");
                navigate(`/viewstaff/${id}`);
            }
            console.log(response)
        });
    }

    if(loader){
        return <Loader />
    }
    
    return (
        <div>
            <Sidenav />
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

            <div className="container body">
                <p className="display-4 center">Edit Staff</p>
                <p className="center">Edit where necessary.</p>
                <div className="ui form m-auto">
                    <form onSubmit={updateStaff} className="m-auto">
                        <div className='row'>
                            <div className="field">
                            <label>First Name</label>   				         
                            <input type="text" name="fname" onChange={handleInput} value={staffInput.fname} />
                            <span className="text-danger">{errorInput.fname}</span>
                            </div>

                            <div className="field">
                            <label>Last Name</label>
                            <input type="text" name="lname" onChange={handleInput} value={staffInput.lname} />
                            <span className="text-danger">{errorInput.lname}</span>
                            </div>

                            <div className="field">
                            <label>Phone Number</label>
                            <input type="text" name="phone" onChange={handleInput} value={staffInput.phone} />
                            <span className="text-danger">{errorInput.phone}</span>
                            </div>

                            <div className="field">
                            <label>E-Mail</label>
                            <input type="email" name="email" onChange={handleInput} value={staffInput.email} />
                            <span className="text-danger">{errorInput.email}</span>
                            </div>

                            <button type="submit" className="btn btn-primary">Update </button> 
                        </div>    
                    </form>
                </div>                
            </div>
        </div>
    );

}

export default Editstaff;

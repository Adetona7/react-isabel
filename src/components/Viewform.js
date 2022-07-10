import React, { Component, useState } from 'react';
import "./app.css";


function Viewform(props) {
    
        const {staffid, fname, lname, phone, email} = props.staff;

        return(
            <form> 
                <div className="field"> 
                <label>Staff Id: {staffid}</label>		          
                </div>

                <div className="field">
                <label>First Name</label>   				         
                <input type="text" placeholder="Enter first name" name="fname" defaultValue={fname} readOnly/>
                <span className="ui red"></span>
                </div>

                <div className="field">
                <label>Last Name</label>
                <input type="text" placeholder="Enter last name" name="lname" defaultValue={lname} readOnly/>
                <span className="ui red"></span>
                </div>

                <div className="field">
                <label>Phone Number</label>
                <input type="text" placeholder="Enter phone number" name="phone" defaultValue={phone} readOnly/>
                <span className="ui red"></span>
                </div>

                <div className="field">
                <label>E-Mail</label>
                <input type="email" placeholder="joe@gmail.com" name="email" defaultValue={email} readOnly/>
                <span className="ui red"></span>
                </div>

                {/* <div className="field">
                <label>Image</label>
                <span>{image_name}</span>
                </div> */}
                                                                           
                {/* <button type="submit" className="ui primary button">Update Staff</button> */}

            </form>
        );
    }
    
export default Viewform;




    // const [staffInput, setStaff] = useState([]);
    // const [errorInput, setError] = useState([]);
    // const { id } = useParams();
    // const handleInput = (e) => {
    //     e.persist();
    //     setStaff({...staffInput, [e.target.name]: e.target.value });
    // }

    // const updateStaff = (e) => {
    //     e.preventDefault();
    //     var axios = require('axios');
    //     var FormData = require('form-data');
    //     var data = new FormData();
    //     data.append('fname', staffInput.fname);
    //     data.append('lname', staffInput.lname);
    //     data.append('phone', staffInput.phone);
    //     data.append('email', staffInput.email);

    //     var config = {
    //     method: 'put',
    //     url: `http://127.0.0.1:8000/api/staffupdate/${id}`,
    //     headers: { 
    //         'Accept': 'application/json', 
    //     },
    //     data : data
    //     };
        
    //     axios(config)
    //     .then(function (response) {
    //     console.log(response);
    //         if(response.data.status === 200){
    //         Swal.fire("Success",response.data.message,"success");
    //         }
    //         else if(response.data.status === 404){
    //             Swal.fire("Error",response.data.message,"error");
    //         }
    //     })
    //     .catch(function (error) {
    //     console.log(error);
    //     });

    // }

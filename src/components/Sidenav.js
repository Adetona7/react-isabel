import React from 'react';
import "./app.css";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

function Sidenav(){

    const navigate = useNavigate();
    const logoutSubmit = (e) => {
        e.preventDefault();

        var axios = require('axios');

        var config = {
        method: 'post',
        url: 'http://localhost:8000/api/logout',
        headers: { 
            'Accept': 'application/json', 
        }
        };

        axios(config)
        .then(response => {
        console.log(response);

        if(response.data.status === 200){
            localStorage.removeItem('access_token');
            localStorage.removeItem('auth_name');
            Swal.fire("Successful",response.data.message,"success");
            navigate('/');
        }
        })
        .catch(function (error) {
        console.log(error);
        });
    }  
    return(
        <section>
            <div id="mySidenav" className="sidenav">
                <ul>
                    <a href="/Home" className='pt-5 my-1'>
                        <i className="fa-solid fa-home me-2 ms-2 fa-lg" style={{ color: "white" }}></i>
                        Dashboard
                    </a>
                        <a href="/Addstaff" className='mt-3 my-1'>
                    <i className="fa-solid fa-user-plus fa-lg me-2 ms-2" style={{ color: "white" }}></i>
                        Add Staff
                    </a>
                    <a href="/View" className='mt-3 my-1'>
                        <i className="fa-solid fa-border-all fa-lg ms-2 me-2" style={{ color: "white" }}></i>
                        View All
                    </a>
                    <button type="button" onClick={logoutSubmit} className="btn btn-danger ms-4 mt-2" href='/Logout'>Logout</button>
                </ul>
            </div>
        </section>
        
    );
}

export default Sidenav;
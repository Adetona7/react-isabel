import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import Stafflist from '../components/Stafflist';
import Loader from '../components/Loader';


function Home() {
    const [staff, setStaff] = useState([]);
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [url, setURL] = useState("http://127.0.0.1:8000/api/staff");

    useEffect(()=>{
        setLoader(true);
        axios.get(url).then((response)=>{
            console.log(response.data.allStaff);
            setStaff(response.data.allStaff);
            setLoader(false);
        }).catch((error)=>{
            console.log(error)
        });
    }, [])


    if(loader){
        return <Loader />
    } 

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

    return (
        <div>
            <div className="ui fixed inverted menu pb-1 pt-1">
                <div className="ui container">                
                    <p className="header item">Isabel College</p>
                    <a className="ui primary button" href='/Addstaff'>Add Staff</a>
                    <a href='/activitylog' className="ui info button">Activity Log</a>
                    <button type="button" onClick={logoutSubmit} className="btn btn-danger" href='/Logout'>Logout</button>                                                   
                </div>
            </div>
            <div className="ui container body">
                <p className="display-5 center">All Staff</p>
                <Stafflist staffs={staff}/>
            </div>           
        </div>
  )
}

export default Home
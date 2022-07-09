import React from 'react';
import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import "./app.css";
import Editform from './Editform';
import Loader from './Loader';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';


function Editstaff() { 
    const { id } = useParams();
    console.log(id);
    const [staff, setStaff] = useState([]);
    const [loader, setLoader] = useState(false);
    const [url, setURL] = useState(`http://127.0.0.1:8000/api/findstaffid/${id}`);

    useEffect(()=>{
        setLoader(true);
        axios.get(url).then((response)=>{
            console.log(response.data.staff);
            setStaff(response.data.staff);
            setLoader(false);
        }).catch((error)=>{
            console.log(error)
        });
    }, [])

    if(loader){
        return <Loader />
    }

    
    return (
        <div className="design">  
            <div className="ui fixed inverted menu">
                <div className="ui container">                
                    <p className="header item">Edit Staff</p>
                    <a className='ui primary button' href='/Home'>Go back</a>                                               
                </div>
            </div>
            <div className="ui container body">            
                <div className="ui form">
                    <Editform staff={staff}/>
                </div>
            </div>
        </div>
    );

}

export default Editstaff;

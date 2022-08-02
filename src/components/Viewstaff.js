import React from 'react';
import { useState, useEffect } from 'react';
import "./app.css";
import Viewform from './Viewform';
import Loader from './Loader';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function Viewstaff() { 
    const { id } = useParams();
    console.log(id);
    const [staff, setStaff] = useState([]);
    const [loader, setLoader] = useState(false);
    const [url, setUrl] = useState(`http://127.0.0.1:8000/api/findstaffid/${id}`);


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
            <div className="ui fixed inverted menu pb-2 pt-2 bg-light">
                <div className="container"> 
                    <div className="col-md-8">
                        <p className="header item text-black">Isabel College</p>
                    </div>

                    <div className="col-md-2">
                        <i className="fa-solid fa-circle-user fa-2x me-2 pt-2 float-end"></i>
                    </div>

                    <div className="col-md-2">
                        <div className="">
                            <p><b>Adetona Oluwabukunmi.<p>Developer.</p></b></p>
                        </div>                              
                    </div>

                </div>               
            </div>
            <div className="ui container body">            
                <div className="ui form">
                    <Viewform staff={staff}/>
                </div>
            </div>
        </div>
    );
}

export default Viewstaff;

import React, { Component, useEffect, useState } from 'react';
import "./app.css";
import axios from 'axios';
import { useParams } from 'react-router-dom'
import Loader from './Loader';


function Viewform(props) {
    const { id } = useParams()
    console.log(id)
    const [image, setImage] = useState([]);
    const [loader, setLoader] = useState(false);
    const [URL, setURL] = useState(`http://localhost:8000/api/image/${id}`);

    useEffect(()=>{
        setLoader(true);
        axios.get(URL).then((response)=>{
            console.log(response.data.image);
            setImage(response.data.image);
            setLoader(false);
        }).catch((error)=>{
            console.log(error)
        });
    }, [])
      
    if(loader){
        return <Loader />
    }

    const {staffid, fname, lname, gender, sec, subject, phone, email} = props.staff;

    return(

        <div className='row'> 
            <div className='col-md-6'>
            {
                image.length > 0 && (
                    image.map((row, key)=>(
                        <div key={key} className="field">
                            <p className='display-6 text-light'>Image</p>         
                            <img width="400" className="rounded" src={`http://localhost:8000/storage/product/image/${row.image}` } />
                        </div>
                    ))
                ) 
            }

            </div>

            <div className='col-md-6'>
                <form>
                    <div className="field"> 
                    <label>Staff Id: {staffid}</label>		          
                    </div>

                    <a href={`/image/${id}`} className="">Upload Image</a>

                    <div className="field mt-2">
                    <label>First Name</label>   				         
                    <input type="text" defaultValue={fname} readOnly/>
                    <span className="ui red"></span>
                    </div>

                    <div className="field">
                    <label>Last Name</label>
                    <input type="text" defaultValue={lname} readOnly/>
                    <span className="ui red"></span>
                    </div>

                    <div className="field">
                    <label>Gender</label>
                    <input type="text" defaultValue={gender} readOnly/>
                    <span className="ui red"></span>
                    </div>

                    <div className="field">
                    <label>Section</label>
                    <input type="text" defaultValue={sec} readOnly/>
                    <span className="ui red"></span>
                    </div>

                    <div className="field">
                    <label>Subject</label>
                    <input type="text" defaultValue={subject} readOnly/>
                    <span className="ui red"></span>
                    </div>

                    <div className="field">
                    <label>Phone Number</label>
                    <input type="text" defaultValue={phone} readOnly/>
                    <span className="ui red"></span>
                    </div>

                    <div className="field">
                    <label>E-Mail</label>
                    <input type="email" defaultValue={email} readOnly/>
                    <span className="ui red"></span>
                    </div> 
                </form>               
            </div>

        </div>
    );
    }
    
export default Viewform;

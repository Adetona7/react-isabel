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

    const {staffid, fname, lname, phone, email} = props.staff;

    return(
        <form> 
            <div className="field"> 
            <label>Staff Id: {staffid}</label>		          
            </div>

            {
                image.length > 0 && (
                    image.map((row, key)=>(
                        <div key={key} className="field">
                            <label>Image:</label>         
                            <img width="200px" src={`http://localhost:8000/storage/product/image/${row.image}` } />
                        </div>
                    ))
                ) 
            }

            <a href={`/image/${id}`} className="">Upload Image</a>

            <div className="field mt-2">
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

        </form>
    );
    }
    
export default Viewform;

import React, { useState } from "react";
import "./app.css";
import swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Image() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [image, setImage] = useState()

    const changeHandler = (event) => {
		setImage(event.target.files[0]);
	};

    const uploadImage = async (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append('staff_id',` ${id}`)
        formData.append('image', image)

        await axios.post(`http://localhost:8000/api/image/upload/${id}`, formData).then(({data})=>{
        swal.fire({
            icon:"success",
            text:data.message
        });
        navigate(`/home`)
        }).catch(({response:{data}})=>{
            swal.fire({
                text:data.message,
                icon:"error"
            })
            })      
    }

    return(
        <div>
            <div className="ui container body"> 
            <div className="display-3 mb-4 center">Upload Image</div>           
                <div className="ui form">
                    <form onSubmit={uploadImage}> 
                        <div className="field"> 
                        <label>Upload Image</label>			          
                        <input type="file" name="image" onChange={changeHandler} />
                        <span className="ui red"></span>
                        </div>

                        <button type="submit" className="btn btn-primary">Upload Image</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Image;
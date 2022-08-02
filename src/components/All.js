import React from 'react';
import axios from 'axios';
import swal from "sweetalert2";

function All(props) {
    const deleteStaff = async (e, id) => {
        e.preventDefault();
        
        const thisClicked = e.currentTarget;
        const isConfirm = await swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            return result.isConfirmed
            });
    
            if(!isConfirm){
            return;
            }
    
            await axios.delete(`http://127.0.0.1:8000/api/staffdelete/${id}`).then(({data})=>{
                swal.fire({
                    icon:"success",
                    text:data.message
                })
                thisClicked.closest("tr").remove();
            }).catch(({response:{data}})=>{
                swal.fire({
                    text:data.message,
                    icon:"error"
                })
                })
        }
    
    const {id, staffid, fname, lname, gender, sec, subject, email} = props.staff;
        return (

            <tr>
                <td>{id}</td>
                <td>{staffid}</td>                              
                <td>{`${lname} ${fname}`}</td>
                <td>{gender}</td>
                <td>{sec}</td>
                <td>{subject}</td>
                <td>{email}</td>
                <td>
                    <div className="dropdown">
                        <a className="fa fa-ellipsis-v" data-bs-toggle="dropdown" style={{ textDecoration: "none" }}></a>
                        <ul className="dropdown-menu rounded-3">
                            <li><a className="dropdown-item btn" href={`/Editstaff/${id}`}>Edit</a></li>
                            <li><a className="dropdown-item btn" href={`/viewstaff/${id}`}>View</a></li>
                            <li><button className="dropdown-item btn" onClick={(e) => deleteStaff(e, id)} href="#">Delete</button></li>
                        </ul>
                    </div>
                </td>
            </tr>
        );
}
 
export default All;
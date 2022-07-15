import React, { Component } from 'react';
import axios from 'axios';
import swal from "sweetalert2";

class Staff extends Component {
    render() { 
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

        const {id, staffid, fname, lname, email} = this.props.staff;
        return (
            <tr>
                <td style={{ textAlign: "center" }}>{id}</td>
                <td>{staffid}</td>
                <td>{`${lname} ${fname}`}</td>
                <td>{email}</td>
                <td>
                    <a href={`/viewstaff/${id}`} className="btn btn-primary btn-sm mx-2">View</a>
                    <button onClick={(e) => deleteStaff(e, id)} className="btn btn-danger btn-sm">Delete</button>
                </td>
            </tr>
        );
    }
}
 
export default Staff;
import React, { Component } from 'react';
import axios from 'axios';
import swal from "sweetalert2";

class Staff extends Component {
    render() { 
        const deleteStudent = (e, id) => {
            e.preventDefault();
            
            const thisClicked = e.currentTarget;
            thisClicked.innerText = "Deleting";
    
            axios.delete(`http://127.0.0.1:8000/api/staffdelete/${id}`).then(response=>{
                if(response.data.status === 200)
                {
                    swal.fire("Deleted!",response.data.message,"success");
                    thisClicked.closest("tr").remove();
                }
                else if(response.data.status === 404)
                {
                    swal.fire("Error",response.data.message,"error");
                    thisClicked.innerText = "Delete";
                }
            });
        }

        const {id, staffid, fname, lname, email} = this.props.staff;
        return (
            <tr>
                <td style={{ textAlign: "center" }}>{id}</td>
                <td>{staffid}</td>
                <td>{`${fname} ${lname}`}</td>
                <td>{email}</td>
                <td>
                    <a href={`/editstaff/${id}`} className="mini ui primary button">Edit</a>
                    <button onClick={(e) => deleteStudent(e, id)} className="mini ui red button">Delete</button>
                </td>
            </tr>
        );
    }
}
 
export default Staff;
import React from 'react';
import Staff from './Staff'
import axios from 'axios';
import swal from "sweetalert2";


function Stafflist({ staffs, data2, data3 }){
    console.log(staffs, data2, data3)
    
    const deleteallStaff = async (e) => {
        e.preventDefault();
        
        const thisClicked = e.currentTarget;
        const isConfirm = await swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete all!'
            }).then((result) => {
            return result.isConfirmed
            });
    
            if(!isConfirm){
            return;
            }
    
            await axios.delete(`http://localhost:8000/api/staff_delete_all`).then(({data})=>{
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
    return(
        <section>
            <div className='row'>
                <div className='col-md-6'>
                    <div className="form-floating mb-1 w-50">
                        <input type="text" className="form-control" id="" placeholder="Search by firstname" name="search" />
                        <label htmlFor="search">Search by firstname</label>
                    </div>
                </div>

                <div className='col-md-6'>
                    <div className="float-end mt-3">
                        <button onClick={(e) => deleteallStaff(e)} className="btn btn-danger">Delete All</button>
                    </div>
                </div>
            </div>
                               
            <div className="data">
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th style={{ width: "50px", textAlign: "center" }}>#</th>
                            <th>Staff Id</th>
                            <th>Full Name</th>
                            <th>E-mail</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffs.map((staff) => {
                            return <Staff staff={staff} key={staff.id} />;
                        })}                        
                    </tbody>
                </table>
            </div>
        </section>
    )
}
export default Stafflist;
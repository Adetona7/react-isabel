import React from 'react';
import Staff from './Staff'


function Stafflist({ staffs, data2, data3 }){
   
    console.log(staffs, data2, data3)
    return(
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
    )
}
export default Stafflist;
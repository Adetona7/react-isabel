import React from "react";
import All from "./All";

function Viewall({ staffs, data2, data3 }) {
    console.log(staffs, data2, data3)
    return(
        <div className="data">
            <table className="ui celled table mb-2 table-hover">
                <thead style={{ textAlign: "" }}>
                    <tr>
                        <th style={{ width: "5px" }}>ID</th>
                        <th style={{ width: "10px" }}>Staff Id</th>
                        <th>Full Name</th>
                        <th style={{ width: "5px" }}>Gender</th>
                        <th style={{ width: "5px" }}>Section</th>
                        <th style={{ width: "10px" }}>Subject</th>
                        <th>Email</th>
                        <th style={{ width: "10px" }}>Action</th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: "" }}>
                {
                    staffs.map((staff) => {
                        return <All staff={staff} key={staff.id}/>;
                    })
                } 
                </tbody>
            </table>
        </div>
    );
}

export default Viewall
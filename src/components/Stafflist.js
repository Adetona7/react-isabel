import React, {useState, useEffect} from 'react';
import Staff from './Staff'
import axios from 'axios';
import swal from "sweetalert2";
import Loader from './Loader';


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

    const [count, setCount] = useState([]);
    const [male, setMale] = useState([]);
    const [female, setFemale] = useState([]);
    const [admin, setAdmin] = useState([]);
    const [acad, setAcad] = useState([]);
    const [others, setOthers] = useState([]);
    const [loader, setLoader] = useState(false);
    const [url, setURL] = useState("http://127.0.0.1:8000/api/count");

    useEffect(()=>{
        setLoader(true);
        axios.get(url).then((response)=>{
            console.log(response.data.count);
            setCount(response.data.count);
            setMale(response.data.male);
            setFemale(response.data.female);
            setAdmin(response.data.admin);
            setAcad(response.data.acad);
            setOthers(response.data.others);
            setLoader(false);
        }).catch((error)=>{
            console.log(error)
        });
    }, [])

    if(loader){
        return <Loader />
    }

    return(
        <section>
            <div className='row mb-3 text'>

                <div className='col-md-6'>
                    <div className='bg-secondary pt-3 pb-3 shadow-lg center'>
                        <i className="fa-solid fa-user-group fa-5x" style={{ color: "white" }}></i>
                        <h2 className='mt-2 text-light'><b>TOTAL STAFF</b></h2>
                        <h2 className="text-light">{count}</h2>
                    </div>
                </div>
                
                <div className='col-md-3 center'>
                    <div className='bg-secondary pt-3 pb-3 shadow-lg center'>
                        <i className="fa-solid fa-person fa-5x"  style={{ color: "white" }}></i>
                        <h2 className='mt-2 text-light'><b>MALE</b></h2>
                        <h2 className="text-light">{male}</h2>
                    </div>
                </div>

                <div className='col-md-3 center'>
                    <div className='bg-secondary pt-3 pb-3 shadow-lg center'>
                        <i className="fa-solid fa-person-dress fa-5x" style={{ color: "white" }}></i>
                        <h2 className='mt-2 text-light'><b>FEMALE</b></h2>
                        <h2 className="text-light">{female}</h2>
                    </div>
                </div>

            </div>
            <div className='row mb-3'>

                <div className='col-md-4 center'>
                    <div className='bg-light pt-3 pb-3 shadow-lg center'>
                        <h4 className=''>ACADEMIC</h4>
                        <h4>{acad}</h4>
                    </div>
                </div>

                <div className='col-md-4 center'>
                    <div className='bg-light pt-3 pb-3 shadow-lg center'>
                        <h4 className=''>NON-ACADEMIC</h4>
                        <h4>{admin}</h4>
                    </div>
                </div>

                <div className='col-md-4 center'>
                    <div className='bg-light pt-3 pb-3 shadow-lg center'>
                        <h4 className=''>OTHERS</h4>
                        <h4>{others}</h4>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-6'>
                    <div className="form-floating mb-1 w-50">
                        <input type="text" className="form-control" id="" placeholder="Search by firstname" name="search" />
                        <label htmlFor="search">Search by firstname</label>
                    </div>
                </div>

                <div className='col-md-6'>
                    <div className="float-end mt-3">
                        <a className="btn btn-primary mx-1" href='/Addstaff'>Add Staff</a>
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
                            <th>Section</th>
                            <th>E-mail</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            staffs.map((staff) => {
                                return <Staff staff={staff} key={staff.id}/>;
                            })
                        }                        
                    </tbody>
                </table>
            </div>
        </section>
    )
}
export default Stafflist;
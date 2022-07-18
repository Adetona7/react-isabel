import React, {useState, useEffect} from 'react';
import Staff from './Staff'
import axios from 'axios';
import swal from "sweetalert2";
// import { useParams } from 'react-router-dom'
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
    const [loader, setLoader] = useState(false);
    const [url, setURL] = useState("http://127.0.0.1:8000/api/count_all_staff");

    useEffect(()=>{
        setLoader(true);
        axios.get(url).then((response)=>{
            console.log(response.data.count);
            setCount(response.data.count);
            setLoader(false);
        }).catch((error)=>{
            console.log(error)
        });
    }, [])

    const [count_m, setCount_m] = useState([]);
    useEffect(()=>{
        setLoader(true);
        axios.get('http://127.0.0.1:8000/api/count_m').then((response)=>{
            console.log(response.data.count_m);
            setCount_m(response.data.count_m);
            setLoader(false);
        }).catch((error)=>{
            console.log(error)
        });
    }, [])

    const [count_f, setCount_f] = useState([]);
    useEffect(()=>{
        setLoader(true);
        axios.get('http://127.0.0.1:8000/api/count_f').then((response)=>{
            console.log(response.data.count_f);
            setCount_f(response.data.count_f);
            setLoader(false);
        }).catch((error)=>{
            console.log(error)
        });
    }, [])

    const [count_admin, setCount_admin] = useState([]);
    useEffect(()=>{
        setLoader(true);
        axios.get('http://127.0.0.1:8000/api/count_admin').then((response)=>{
            console.log(response.data.count_admin);
            setCount_admin(response.data.count_admin);
            setLoader(false);
        }).catch((error)=>{
            console.log(error)
        });
    }, [])

    const [count_acad, setCount_acad] = useState([]);
    useEffect(()=>{
        setLoader(true);
        axios.get('http://127.0.0.1:8000/api/count_acad').then((response)=>{
            console.log(response.data.count_acad);
            setCount_acad(response.data.count_acad);
            setLoader(false);
        }).catch((error)=>{
            console.log(error)
        });
    }, [])

    const [count_others, setCount_others] = useState([]);
    useEffect(()=>{
        setLoader(true);
        axios.get('http://127.0.0.1:8000/api/count_others').then((response)=>{
            console.log(response.data.count_others);
            setCount_others(response.data.count_others);
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
                        <h2 className="text-light">{count_m}</h2>
                    </div>
                </div>

                <div className='col-md-3 center'>
                    <div className='bg-secondary pt-3 pb-3 shadow-lg center'>
                        <i className="fa-solid fa-person-dress fa-5x" style={{ color: "white" }}></i>
                        <h2 className='mt-2 text-light'><b>FEMALE</b></h2>
                        <h2 className="text-light">{count_f}</h2>
                    </div>
                </div>

            </div>
            <div className='row mb-3'>

                <div className='col-md-4 center'>
                    <div className='bg-light pt-3 pb-3 shadow-lg center'>
                        <h4 className=''>ACADEMIC</h4>
                        <h4>{count_acad}</h4>
                    </div>
                </div>

                <div className='col-md-4 center'>
                    <div className='bg-light pt-3 pb-3 shadow-lg center'>
                        <h4 className=''>NON-ACADEMIC</h4>
                        <h4>{count_admin}</h4>
                    </div>
                </div>

                <div className='col-md-4 center'>
                    <div className='bg-light pt-3 pb-3 shadow-lg center'>
                        <h4 className=''>OTHERS</h4>
                        <h4>{count_others}</h4>
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
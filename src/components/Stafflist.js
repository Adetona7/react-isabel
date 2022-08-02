import React, {useState, useEffect} from 'react';
import Staff from './Staff'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from './Loader';


function Stafflist({ staffs, data2, data3 }){
    console.log(staffs, data2, data3)

    const [staff, setStaff] = useState([]);
    const { fname } = useParams();

    useEffect(()=>{
        setLoader(true);
        axios.get(`http://127.0.0.1:8000/api/staff/${fname}`).then((response)=>{
            console.log(response.data.staff);
            setStaff(response.data.staff);
            setLoader(false);
        }).catch((error)=>{
            console.log(error)
        });
    }, [])

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

                <div className='col-md-6 center'>
                    <div className='color pt-3 pb-3 rounded '>
                        {/* <i className="fa-solid fa-user-group fa-lg me-2" style={{ color: "white" }}></i> */}
                        <p className='mt-2'>
                            <i className="fa-solid fa-user-group fa-lg me-2" style={{ color: "white" }}></i>
                            <b>TOTAL STAFF</b>
                        </p>
                        <p className="">{count}</p>
                    </div>
                </div>
                
                <div className='col-md-3 center'>
                    <div className='pt-3 pb-3 rounded color'>
                        {/* <i className="fa-solid fa-person fa-lg"  style={{ color: "white" }}></i> */}
                        <p className='mt-2 '>
                            <i className="fa-solid fa-person fa-lg me-2"  style={{ color: "white" }}></i>
                            <b>MALE</b>
                        </p>
                        <p className="">{male}</p>
                    </div>
                </div>

                <div className='col-md-3 center'>
                    <div className='color pt-3 pb-3 rounded'>
                        {/* <i className="fa-solid fa-person-dress fa-5x" style={{ color: "white" }}></i> */}
                        <p className='mt-2 '>
                            <i className="fa-solid fa-person-dress fa-lg me-2" style={{ color: "white" }}></i>
                            <b>FEMALE</b>
                        </p>
                        <p className="">{female}</p>
                    </div>
                </div>

            </div>
            <div className='row mb-3'>

                <div className='col-md-4 center'>
                    <div className='bg-light pt-3 pb-3 rounded'>
                        <p className=''><b>ACADEMIC</b></p>
                        <p>{acad}</p>
                    </div>
                </div>

                <div className='col-md-4 center'>
                    <div className='bg-light pt-3 pb-3 rounded'>
                        <p className=''><b>ADMIN</b></p>
                        <p>{admin}</p>
                    </div>
                </div>

                <div className='col-md-4 center'>
                    <div className='bg-light pt-3 pb-3 rounded'>
                        <p className=''><b>OTHERS</b></p>
                        <p>{others}</p>
                    </div>
                </div>
            </div>
            <div className='row'>

                <div className='col-md-8'>
                    <div className="float-end mb-1">
                        <a className="btn btn-primary mx-1" href='/Addstaff'>Add Staff</a>
                    </div>
                </div>

                <div className='col-md-4'>
                    <div className='bg-light rounded-3'>
                        <h4 className='center'></h4>
                    </div>
                </div>

            </div>

             <div className="row">                

                <div className="col-md-8">
                    <div className="data">
                    <table className="ui celled table">
                        <thead>
                            <tr>
                                <th style={{ width: "50px", textAlign: "center" }}>#</th>
                                <th style={{ width: "50px", textAlign: "center" }}>Staff Id</th>
                                <th>First Name</th>
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
                    <a className="btn btn-primary mb-5" href="/View">View all available staff</a>
                    </div>
                </div>

                <div className='col-md-4'>
                    <div className='bg-light rounded-3 p-4'>
                        <h6 className='center'><b><u>SUPER ADMIN</u></b></h6>
                        <hr />
                        <img src="https://lh3.googleusercontent.com/ogw/AOh-ky1Wa8eg4WM3rGGkWwMNvFSdhvOmAfW0ZHLSQ8Kr7w=s32-c-mo" alt="" width="32" height="32" class="rounded-circle me-2 float-end" />
                        <p>Oluwabukunmi, Adetona.</p>
                        <p><b>Senior Developer, ISABEL COLLEGE.</b></p>
                        {/* <p>Edit Details</p> */}
                        <a href="#" className="btn btn-primary">Edit Details</a>
                    </div>
                </div>
            
            </div>                  
            
        </section>
    )
}
export default Stafflist;
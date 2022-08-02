import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import Swal from 'sweetalert2';
import { useNavigate, useParams } from "react-router-dom";
import Stafflist from '../components/Stafflist';
import Loader from '../components/Loader';
import Sidenav from '../components/Sidenav';
import Footer from '../components/Footer';


function Home() {
    const [staff, setStaff] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [staffsPerPage] = useState(5);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const fetchStaffs = async () => {
            setLoader(true);
            const response = await axios.get('http://127.0.0.1:8000/api/staff');
            setStaff(response.data.allStaff);
            setLoader(false);
        }

        fetchStaffs();
    }, []);


    if(loader){
        return <Loader />
    } 

    const indexOfLastStaff = currentPage * staffsPerPage;
    const indexOfFirstStaff = indexOfLastStaff - staffsPerPage;
    const currentStaff = staff.slice(indexOfFirstStaff, indexOfLastStaff);

    return (
        <div>
            <div className="row">
                <div className="ui fixed inverted menu pb-2 pt-2 bg-light">
                    <div className="container"> 
                        <div className="col-md-8">
                            <p className="header item text-black">ISABEL COLLEGE</p>
                        </div>

                        <div className="col-md-2">
                            {/* <i className="fa-solid fa-circle-user fa-2x me-2 pt-2 float-end"></i> */}
                            <img src="https://lh3.googleusercontent.com/ogw/AOh-ky1Wa8eg4WM3rGGkWwMNvFSdhvOmAfW0ZHLSQ8Kr7w=s32-c-mo" alt="" width="32" height="32" class="rounded-circle me-2 float-end" />
                        </div>

                        <div className="col-md-2">
                            <div className="">
                                <p><b>Adetona Oluwabukunmi.<p>Developer.</p></b></p>
                            </div>                              
                        </div>

                    </div>               
                </div>
            </div>
            <div className="ui container-fluid body">
                <Sidenav />
                <h4 className="mt-5"><b>Dashboard</b></h4>
                <p className="text-muted">Isabel College/Admin</p>
                <Stafflist staffs={currentStaff} />
            </div>     
            <Footer />      
        </div>
  )
}

export default Home
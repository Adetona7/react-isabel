import React, {useState, useEffect} from 'react';
import './app.css';
import Loader from './Loader';
import axios from 'axios';
import Sidenav from './Sidenav';
import Viewall from './Viewall';
import swal from 'sweetalert2';
import Pagination from './Pagination';
import Footer from './Footer';

function View() {
    const [staff, setStaff] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [staffsPerPage] = useState(10);
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

    const [count, setCount] = useState([]);
    const [male, setMale] = useState([]);
    const [female, setFemale] = useState([]);
    const [admin, setAdmin] = useState([]);
    const [acad, setAcad] = useState([]);
    const [others, setOthers] = useState([]);
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

    if(loader){
        return <Loader />
    }

    const indexOfLastStaff = currentPage * staffsPerPage;
    const indexOfFirstStaff = indexOfLastStaff - staffsPerPage;
    const currentStaff = staff.slice(indexOfFirstStaff, indexOfLastStaff);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return(
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

            <Sidenav />

            <div className='container-fluid mb-5'>
                <div className='row mb-3 text body'>
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

                <div className="row">
                    <div className="col-md-6">
                        <div className="form-floating mb-1">
                            <input type="text" className="form-control" id="" placeholder="Search by firstname" name="search" />
                            <label htmlFor="search">Search by firstname</label>
                        </div>
                    </div>

                    <div className="col-md-6 mt-3">
                        <button onClick={(e) => deleteallStaff(e)} className="btn btn-danger float-end">Delete All</button>
                    </div>
                </div>

                <div>
                    <Viewall staffs={currentStaff}/>
                    <Pagination 
                        staffsPerPage={staffsPerPage} 
                        totalStaffs={staff.length} 
                        paginate={paginate} 
                    />
                </div>            
            </div>
            <Footer />
        </div>
    );
}

export default View;
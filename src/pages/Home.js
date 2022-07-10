import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Stafflist from '../components/Stafflist';
import Loader from '../components/Loader';

function Home() {
    const [staff, setStaff] = useState([]);
    const [loader, setLoader] = useState(false);
    const [url, setURL] = useState("http://127.0.0.1:8000/api/staff");

    useEffect(()=>{
        setLoader(true);
        axios.get(url).then((response)=>{
            console.log(response.data.allStaff);
            setStaff(response.data.allStaff);
            setLoader(false);
        }).catch((error)=>{
            console.log(error)
        });
    }, [])

    if(loader){
        return <Loader />
    }    

    return (
        <div>
            <div className="ui fixed inverted menu">
                <div className="ui container">                
                    <p className="header item">All Staff</p>
                    <a className="ui primary button" href='/Addstaff'>Add Staff</a>                                                   
                    <a className="ui red button" href='/Logout'>Logout</a>                                                   
                </div>
            </div>
            <div className="ui container body">
                <Stafflist staffs={staff}/>
            </div>           
        </div>
  )
}
export default Home
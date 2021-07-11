import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Home.css'
function Home() {
    const [ipdata, setIpdata] = useState()
    const [userip, setUserip] = useState("157.44.186.61")
    const ipcalled = () =>{
        axios.get(`https://geo.ipify.org/api/v1?apiKey=at_yFvUMou2NIuvOi6o0QBY0cpo3ntOp&ipAddress=${userip}`).then((Response)=>{
           // console.log(Response.data)
            setIpdata(Response.data)
            console.log(ipdata)
        }).catch((error)=>{
            alert(error.message)
        })
    }

    useEffect(() => {
        ipcalled()
    }, [])
    const clicked = () =>{
        ipcalled()
    }

    return (
        

        <div>
            <div className="top">
                <div className="form">
                    <input type="text" name="userip" id="userip" onChange={(e)=>setUserip(e.target.value)} />
                    <button onClick={clicked}>check</button>
                </div>
            </div>
            <div className="middle">
               <div className="container">
                   <div className="row ">
                   <div className="col-md-3 text-left">
                       IP ADDRESS <br />
                       <h3>{ipdata ? ipdata.ip : ""}</h3>
                   </div>
                   <div className="col-md-3 text-left">
                       LOCATION
                       <h3>{ipdata ? ipdata.location.city : ""}</h3>
                   </div>
                   <div className="col-md-3">
                       TIMEZONE
                       <h3>{ipdata ? ipdata.location.timezone : ""}</h3>
                   </div>
                   <div className="col-md-3">
                       ISP
                       <h3>{ipdata ? ipdata.isp : ""}</h3>
                   </div>
            </div>
               </div>
            </div>
            <div className="bottom">
            
            </div>
        </div>
    )
}

export default Home

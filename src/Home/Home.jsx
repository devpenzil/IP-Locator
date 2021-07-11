import React, {useRef, useEffect, useState } from 'react'
import axios from 'axios'
import right from '../../src/Assets/images/icon-arrow.svg'
import './Home.css'
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
 


function Home() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWpvYWxleDAxMiIsImEiOiJja3F5eDA3YjYxYzhsMnZvMWFyNGpodDJvIn0.1fs-cBrslN2Is_IBzlwhyg';
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);
    //----------------------
    const [ipdata, setIpdata] = useState()
    const [userip, setUserip] = useState("157.44.186.61")
    //--------------------------
    const ipcalled = () =>{
        axios.get(`https://geo.ipify.org/api/v1?apiKey=at_yFvUMou2NIuvOi6o0QBY0cpo3ntOp&ipAddress=${userip}`).then((Response)=>{
           // console.log(Response.data)
            setIpdata(Response.data)
            console.log(ipdata)
        }).catch((error)=>{
            alert(error.message)
        })
    }
    //----------------------

    useEffect(() => {
        ipcalled()
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom
        });
        });
    //--------------------
    const clicked = () =>{
        ipcalled()
    }
    //-------------------

    return (
        

        <div>
            <div className="top">
                <h2 className="heading">IP Address Tracker</h2>
                <div className="form">
                    <input type="text" name="userip" id="userip" onChange={(e)=>setUserip(e.target.value)} placeholder="search for any ip address" />
                    <button onClick={clicked}><img src={right} alt="" /></button> 
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

            <div ref={mapContainer} className="map-container" />
            </div>
        </div>
    )
}

export default Home

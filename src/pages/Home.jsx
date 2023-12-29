import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import SearchRide from '../components/SearchRide'
import MapSection from '../components/MapSection'
import AvailableRides from '../components/AvailableRides'

const Home = ({show,setShow}) => {

  const [startCoord,setStartCoord] = useState([0,0]);
  const [endCoord,setEndCoord] = useState([0,0]);

  const [rides,setRides] = useState([])

  useEffect(()=>{
    console.log("in home : ",show)
   navigator.geolocation.getCurrentPosition((position)=>{
      let latitude=position.coords.latitude;
      let longitude=position.coords.longitude;

      let coords=[longitude,latitude];

      // console.log(coords)
      setStartCoord(coords);
      setEndCoord(coords);
    })
  },[])
  

  return (
    <div>
        <div className='flex md:flex-row flex-col items-center'>
            <div className='w-[90%] md:w-[30%] p-4'>
                {!show && <SearchRide setRides={setRides} show={show}/>}

                <AvailableRides setStartCoord={setStartCoord} setEndCoord={setEndCoord} rides={rides}/>
            </div>
            <div className='w-[90%] md:w-[70%] p-4 z-1'>
                {!show && <MapSection startCoord={startCoord} endCoord={endCoord}  show={show} />}
            </div>
        </div>
    </div>
  )
}

export default Home
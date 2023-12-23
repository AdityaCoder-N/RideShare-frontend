import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import SearchRide from '../components/SearchRide'
import MapSection from '../components/MapSection'
import AvailableRides from '../components/AvailableRides'

const Home = () => {

  const [startCoord,setStartCoord] = useState([0,0]);
  const [endCoord,setEndCoord] = useState([0,0]);

  const [rides,setRides] = useState([])

  useEffect(()=>{

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
        <div className='flex'>
            <div className='w-[30%] p-4'>
                <SearchRide setRides={setRides}/>

                <AvailableRides setStartCoord={setStartCoord} setEndCoord={setEndCoord} rides={rides}/>
            </div>
            <div className='w-[70%] p-4 z-1'>
                <MapSection startCoord={startCoord} endCoord={endCoord}   />
            </div>
        </div>
    </div>
  )
}

export default Home
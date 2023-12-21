import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import SearchRide from '../components/SearchRide'
import MapSection from '../components/MapSection'
import AvailableRides from '../components/AvailableRides'

const Home = () => {

  const [startCoord,setStartCoord] = useState([-122.662323, 45.523751]);
  const [endCoord,setEndCoord] = useState([-84.512023, 39.102779])

  return (
    <div>
        <div className='flex'>
            <div className='w-[30%] p-4'>
                <SearchRide/>

                <AvailableRides setStartCoord={setStartCoord} setEndCoord={setEndCoord}/>
            </div>
            <div className='w-[70%] p-4 z-1'>
                <MapSection startCoord={startCoord} endCoord={endCoord}   />
            </div>
        </div>
    </div>
  )
}

export default Home
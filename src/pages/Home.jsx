import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import SearchRide from '../components/SearchRide'
import MapSection from '../components/MapSection'
import AvailableRides from '../components/AvailableRides'

const Home = () => {

  const [startCoord,setStartCoord] = useState([78.032188,30.316496]);
  const [endCoord,setEndCoord] = useState([77.10068000,28.65655000])

  return (
    <div>
        <div className='flex'>
            <div className='w-[30%] p-4'>
                <SearchRide/>

                <AvailableRides setStartCoord={setStartCoord} setEndCoord={setEndCoord}/>
            </div>
            <div className='w-[70%] p-4 z-1'>
                {/* <MapSection startCoord={startCoord} endCoord={endCoord}   /> */}
            </div>
        </div>
    </div>
  )
}

export default Home
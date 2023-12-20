import React from 'react'
import Navbar from '../components/Navbar'
import SearchRide from '../components/SearchRide'
import MapSection from '../components/MapSection'
import AvailableRides from '../components/AvailableRides'

const Home = () => {
  const startCoord = [-122.662323, 45.523751]; // Example start coordinate
const endCoord = [-84.512023, 39.102779]; // Example end coordinate
  return (
    <div>
        

        <div className='flex'>
            <div className='w-[30%] p-4'>
                <SearchRide/>

                <AvailableRides/>
            </div>
            <div className='w-[70%] p-4'>
                <MapSection startCoord={startCoord} endCoord={endCoord} />
            </div>
        </div>
    </div>
  )
}

export default Home
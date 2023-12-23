import React, { useEffect, useState } from 'react'
import car from '../assets/car.jpg'

import { useNavigate } from 'react-router-dom';


const SingleRide = ({name,seats,from,to,startCoord,endCoord,setStartCoord,setEndCoord,id,cost})=>{

    const [accept,setAccept] = useState(false);
    const navigate = useNavigate();
    const setRouteCoordinates=async()=>{

        setStartCoord(startCoord);
        setEndCoord(endCoord);

    }
    const acceptRide =()=>{
        navigate(`/accept-ride/${id}`);
    }
    return(
        <div className='bg-gray-300 rounded-xl p-4 mt-2'>
            <div className='flex w-full gap-4'>
                <div className='w-[30%] h-[80px]'>
                    <img src={car} alt="" className='h-full w-full object-cover'/>
                </div>
                <div className='w-[70%]'>
                    <div className='font-semibold'>Rider Name - {name}</div>
                    <div className='font-semibold'>Cost - {cost} coins</div>
                    <div className='font-semibold'>Seats Available - {seats}</div>

                </div>
            </div>
            <div className='flex justify-between font-semibold mt-2'>

                <div>From - {from}</div>
                <div>To - {to}</div>

            </div>
            <button className='bg-black text-white rounded-xl py-1 w-full mt-3 cursor-pointer' onClick={setRouteCoordinates}>View Route</button>
            <button className='bg-black text-white rounded-xl py-1 w-full mt-2 cursor-pointer'  onClick={acceptRide}>Accept Ride</button>

            
        </div>
    )
}


const AvailableRides = ({rides ,setStartCoord,setEndCoord}) => {

  return (
    <div className='rounded-xl border-2 border-gray-500 p-2 mt-2'>
        <h2 className='text-xl font-semibold'>Available Rides</h2>

        <div className='max-h-[42vh] h-[42vh] overflow-y-scroll mt-2'>

            {
            rides.map((ride,index)=>{
                return(
                    <SingleRide name={ride.postedBy.name} seats={ride.seatsAvailable} from={ride.source} to={ride.destination} startCoord={ride.sourceCoord} endCoord={ride.destinationCoord} key={index} setStartCoord={setStartCoord} setEndCoord={setEndCoord} id={ride._id} cost={ride.cost}/>
                )
            })    
            }
        </div>
        
    </div>
  )
}

export default AvailableRides
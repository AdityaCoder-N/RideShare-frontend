import React from 'react'
import car from '../assets/car.jpg'


const SingleRide = ()=>{
    return(
        <div className='bg-gray-300 rounded-xl p-4 mt-2'>
            <div className='flex w-full gap-4'>
                <div className='w-[30%] h-[80px]'>
                    <img src={car} alt="" className='h-full w-full object-cover'/>
                </div>
                <div className='w-[70%]'>
                    <div className='font-semibold'>Rider Name - Aditya</div>
                    <div className='font-semibold'>Cost - 450 coins</div>
                </div>
            </div>
            <div className='flex justify-between font-semibold mt-2'>

                <div>From - Rajpur,Dehradun</div>
                <div>To - Mussourie,Dehradun asdasda</div>

            </div>
            <button className='bg-black text-white rounded-xl py-1 w-full mt-3 cursor-pointer'>Accept Ride</button>
        </div>
    )
}


const AvailableRides = () => {
  return (
    <div className='rounded-xl border-2 border-gray-500 p-2 mt-2'>
        <h2 className='text-xl font-semibold'>Available Rides</h2>

        <div className='max-h-[42vh] overflow-y-scroll mt-2'>

            <SingleRide/>
            <SingleRide/>
            <SingleRide/>
        </div>
        
    </div>
  )
}

export default AvailableRides
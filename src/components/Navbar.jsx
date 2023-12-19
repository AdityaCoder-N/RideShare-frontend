import React from 'react'

const Navbar = () => {
  return (
    <nav className='h-[8vh] w-full p-4 px-8 flex justify-between items-center bg-white'>
        <div>
            <h1 className='text-2xl'>RideShare</h1>
        </div>

        <div className='w-[30%] flex justify-between items-center'>
            <a href="">Share Ride</a>
            <a href="">Get Ride</a>
            <a href="">Verification</a>
            <a href="">Logout</a>
        </div>
    </nav>
  )
}

export default Navbar
import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <nav className='h-[8vh] w-full p-4 px-8 flex justify-between items-center bg-white'>
        <div>
            <Link to='/' className='text-2xl'>RideShare</Link>
        </div>

        <div className='w-[30%] flex justify-between items-center'>
            <Link to="/create-ride">Share Ride</Link>
            <Link to="/">Get Ride</Link>
            <Link to="/verify">Verification</Link>
            <Link to="">Logout</Link>
        </div>
    </nav>
  )
}

export default Navbar
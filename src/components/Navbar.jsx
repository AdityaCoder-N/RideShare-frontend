import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FaBars } from "react-icons/fa";

const Navbar = ({show,setShow}) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const [admin,setAdmin]=useState(false);
  

  useEffect(()=>{
    
    if(user==null){
      navigate('/login')
    }
    else if(user.isAdmin==true){
      setAdmin(true);
    }
  },[])

  const logout = () =>{
    Cookies.remove('authToken');
    localStorage.clear();
    navigate('/login');
  }

  const toggleMenu =()=>{
    console.log("clicked")
    setShow(!show);
  }
  return (
    <nav className='h-[8vh] w-full p-4 md:px-8 flex justify-between items-center bg-white'>
        <div>
            <Link to='/' className='text-2xl'>RideShare</Link>
        </div>

        <div className='hidden md:flex gap-6  justify-between items-center'>
            {
              admin?
              <Link to="/view-requests">View Requests</Link>:
              <>
              <Link to="/create-ride">Share Ride</Link>
              <Link to="/">Get Ride</Link>
              <Link to="/verify">Verification</Link>
              <Link to="/ride-status">Ride Status</Link>
              
              </>
            }

            <p onClick={logout} className='cursor-pointer'>Logout</p>
        </div>

        <div className='flex md:hidden z-30' onClick={toggleMenu}><FaBars /></div>
        {
          show &&
          <div className='transition-all duration-500 z-30 fixed bg-gray-300 text-black h-[100vh] w-[80vw] top-0 left-0 flex flex-col items-center gap-12 font-semibold  justify-center'>
            {
              admin?
              <Link to="/view-requests" onClick={toggleMenu}>View Requests</Link>:
              <>
              <Link to="/create-ride" onClick={toggleMenu}>Share Ride</Link>
              <Link to="/" onClick={toggleMenu}>Get Ride</Link>
              <Link to="/verify" onClick={toggleMenu}>Verification</Link>
              <Link to="/ride-status" onClick={toggleMenu}>Ride Status</Link>
              
              </>
            }


          </div>
        }
    </nav>
  )
}

export default Navbar
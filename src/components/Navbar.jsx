import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
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
  return (
    <nav className='h-[8vh] w-full p-4 px-8 flex justify-between items-center bg-white'>
        <div>
            <Link to='/' className='text-2xl'>RideShare</Link>
        </div>

        <div className='gap-6 flex justify-between items-center'>
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
    </nav>
  )
}

export default Navbar
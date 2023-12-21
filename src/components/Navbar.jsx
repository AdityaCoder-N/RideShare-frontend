import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
const Navbar = () => {
  const navigate = useNavigate();
  const {setUser} = useContext(UserContext);

  const logout = () =>{
    setUser(null);
    Cookies.remove('authToken');
    localStorage.clear();
    navigate('/login');
  }
  return (
    <nav className='h-[8vh] w-full p-4 px-8 flex justify-between items-center bg-white'>
        <div>
            <Link to='/' className='text-2xl'>RideShare</Link>
        </div>

        <div className='w-[40%] flex justify-between items-center'>
            <Link to="/create-ride">Share Ride</Link>
            <Link to="/">Get Ride</Link>
            <Link to="/verify">Verification</Link>
            <Link to="/ride-status">Ride Status</Link>
            <Link to="/view-requests">View Requests</Link>
            <p onClick={logout} className='cursor-pointer'>Logout</p>
        </div>
    </nav>
  )
}

export default Navbar
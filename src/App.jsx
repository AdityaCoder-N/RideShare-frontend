import React,{useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import CreateRide from './pages/CreateRide';
import Verification from './pages/Verification';
import ViewRequests from './pages/ViewRequests';
import RidesStatus from './pages/RidesStatus';
import AcceptRide from './pages/AcceptRide';
import AdminLogin from './pages/AdminLogin';

function App() {
  const [show,setShow]=useState(false);
  return (
    <div>
      <Router>
        {/* Navbar is rendered conditionally */}
        <Routes>
          {/* Public routes without Navbar */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Routes with Navbar */}
          <Route
            path="/*"
            element={
              <>
                <Navbar show={show} setShow={setShow}/>
                <Routes>
                  <Route path="/" element={<Home show={show} setShow={setShow}/>} />
                  <Route path="/create-ride" element={<CreateRide />} />
                  <Route path="/verify" element={<Verification />} />
                  <Route path="/view-requests" element={<ViewRequests />} />
                  <Route path="/ride-status" element={<RidesStatus />} />
                  <Route path="/accept-ride/:id" element={<AcceptRide />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

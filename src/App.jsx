import React from 'react'
import './App.css'
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

  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/create-ride" element={<CreateRide />} />
          <Route path="/verify" element={<Verification/>} />
          <Route path="/view-requests" element={<ViewRequests/>} />
          <Route path="/ride-status" element={<RidesStatus/>} />
          <Route path="/accept-ride/:id" element={<AcceptRide/>} />

        </Routes>
      </Router>
    </div>
  )
}

export default App

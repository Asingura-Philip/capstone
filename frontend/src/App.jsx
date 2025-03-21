// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landingpage.jsx';
import SignUpPage from './pages/signup.jsx'; // Your sign-up page
import LoginPage from './pages/login.jsx'; // Your login page
import Navbar from './components/navbar.jsx';
import { Box } from '@chakra-ui/react';
import JobSeekerDashboard from './pages/jobseekerdashboard.jsx'

function App() {
  return (
    <Box minH={"100vh"}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/login" element={<LoginPage/>} />  
        <Route path='/job-seeker-dashboard' element={<JobSeekerDashboard/>}/>
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Box>
    
  );
}

export default App;

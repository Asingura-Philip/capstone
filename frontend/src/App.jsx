// src/App.js
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from './pages/landingpage.jsx';
import SignUpPage from './pages/signup.jsx';
import LoginPage from './pages/login.jsx';
import Navbar from './components/navbar.jsx';
import { Box } from '@chakra-ui/react';
import JobSeekerDashboard from './pages/jobseekerdashboard.jsx';
import MyForm from './pages/test.jsx';
import EmployerDashboard from './pages/employerdashboard.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx';

function App() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/job-seeker-dashboard' && location.pathname !== '/employer-dashboard'; // Hide Navbar on dashboard

  return (
    <Box minH="100vh">
      {showNavbar && <Navbar />} {/* Conditionally render Navbar */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/job-seeker-dashboard" element={<JobSeekerDashboard />} />
        <Route path="/employer-dashboard" element={
          <ErrorBoundary>
            <EmployerDashboard />
          </ErrorBoundary>
          }/>
        <Route path="/test" element={<MyForm/>}/>
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Box>
  );
}

export default App;
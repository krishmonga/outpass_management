import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to login on initial load */}
        <Route path="/home" element={<Home />} /> {/* Home page accessible after login */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/azad-hostel" element={<StudentDashboard />} />
        <Route path="/parmar-hostel" element={<StudentDashboard />} />
        <Route path="/shashtri-hostel" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;

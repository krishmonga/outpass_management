import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import Login from './pages/Login';
import Register from './pages/Signup';
import OutpassForm from './components/Outpassform'; return (
    
    <Router>
        <Navbar />
        <Routes>
            <Route path="/home" element={<Home />} /> {/* Home page accessible after login */}
            <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to login on initial load */}
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/faculty" element={<FacultyDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Dynamic Hostel Routes */}
            <Route path="/:hostelName" element={<StudentDashboard />} />

            {/* Outpass Form specific to a hostel */}
            <Route path="/outpass/:hostelName" element={<OutpassForm />} />  {/* Example dynamic route for outpass form */}
        </Routes>
    </Router>
);
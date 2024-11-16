// App.js or App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home, Login, NotFound, Signup, StudentDashboard } from "@/pages";

import { useQuery } from '@apollo/client';
import { GET_AUTHENTICATED_USER } from './graphql/queries/user.query';
import Navbar from './components/Navbar';
import { useDispatch } from 'react-redux';
import { storeAuthData } from './redux/authSlice';
import { GetAuthenticatedUserResponse } from './types and schemas/getAuthenticatedUser.query';

function AppRoutes() {
    const dispatch = useDispatch()
    const { data, loading } = useQuery<GetAuthenticatedUserResponse>(GET_AUTHENTICATED_USER)
    console.log('this the first query', data?.authUser?.isStudent)

    useEffect(() => {
        if(data) dispatch(storeAuthData(data))
    }, [data, loading])
    console.log(`loading`, loading)
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<NotFound />} />
                <Route path='/student-dashboard' element={<StudentDashboard />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
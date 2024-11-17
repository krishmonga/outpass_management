// App.js or App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { FacultyDashboard, Home, Login, NotFound, Signup, StudentDashboard } from "@/pages";

import { useQuery } from '@apollo/client';
import { GET_AUTHENTICATED_USER } from './graphql/queries/user.query';
import Navbar from './components/Navbar';
import { useDispatch } from 'react-redux';
import { storeAuthData } from './redux/authSlice';
import { GetAuthenticatedUserResponse } from './types and schemas/getAuthenticatedUser.query';
import { BackgroundGrid } from './components';
import {Page} from "@/payments/page";

function AppRoutes() {
    const dispatch = useDispatch()
    const { data, loading } = useQuery<GetAuthenticatedUserResponse>(GET_AUTHENTICATED_USER)
    const student = data?.authUser?.isStudent
    const auth = !!data?.authUser


    useEffect(() => {
        if (data) dispatch(storeAuthData(data))
    }, [data, loading])

    if (loading) return (
        <div className="absolute inset-0 bg-zinc-200/50 backdrop-blur-md flex items-center justify-center z-50">
            <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full border-t-4 border-black w-16 h-16 border-solid"></div> {/* Spinner */}
                <div className="text-black text-xl font-semibold">Loading...</div>
            </div>
        </div>
    );

    return (
        <Router>
            <BackgroundGrid >

                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={auth ? <Navigate to={'/'} /> : <Login />} />
                    <Route path="/signup" element={auth ? <Navigate to={'/'} /> : <Signup />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path='/dashboard/:hostel' element={auth ? student ? <StudentDashboard /> : <FacultyDashboard /> : <Navigate to={'/login'} />} />
                    <Route path='/test' element={<Page />} />
                </Routes>
            </BackgroundGrid>
        </Router>
    );
}

export default AppRoutes;
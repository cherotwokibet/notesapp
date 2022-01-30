import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute({children}) {
    const {auth} = useAuth();
    // console.log(auth)
    return (
        auth.currentUser ? children : <Navigate to='/login'/>
    )
}


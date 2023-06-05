import React from 'react';
import {Navigate, Outlet, useParams} from 'react-router-dom';
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

const PrivateRoute = () => {
    const {username} = useParams();
    const {user} = useContext(AuthContext); // determine if authorized, from context or however you're doing it
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    console.log(user.username)
    return user.username === username? <Outlet/> : <Navigate to="/"/>;
}

export default PrivateRoute;
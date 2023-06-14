import React, { Fragment,useEffect,useState } from 'react'
import { useSelector } from "react-redux"
import {  Navigate } from 'react-router-dom';


const ProtectedRoute = (props) => {
    const { Component,isAdmin } = props;
    const { loading, isAuthenticated,user } = useSelector(state => state.user);
    return (
        <Fragment>
            {!loading && (isAuthenticated===false  ?  < Navigate to="/login" />:<Component /> )}
            {(loading===false && isAdmin && user) && (user.role!=="admin"?<Navigate to="/login"/>:<Fragment></Fragment>)}
        </Fragment>
    );
}

export default ProtectedRoute
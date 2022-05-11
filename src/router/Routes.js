import React from "react";
import SignIn from "../components/SignIn";
import Register from "../components/Register";
import VerifyEmail from "../components/VerifyEmail";
import ResetPassword from "../components/ResetPwFinal";
import Reset from "../components/ResetPwInitial";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";

function Routing(){
    return(
        <Routes>
            <Route path="/" element={<SignIn />}/>
            <Route path="register" element={<Register />}/>
            <Route path="VerifyEmail" element={<VerifyEmail />}/>
            <Route path="Reset" element={<Reset />}/>
            <Route path="ResetPassword" element={<ResetPassword />}/>
            <Route path="Dashboard" element={<Dashboard />}/>
        </Routes>
    )
}
export default Routing;
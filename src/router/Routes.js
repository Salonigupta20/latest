import React from "react";
import SignIn from "../components/SignIn";
import Register from "../components/Register";
import VerifyEmail from "../components/VerifyEmail";
import ResetPassword from "../components/ResetPwFinal";
import Reset from "../components/ResetPwInitial";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import {Context as Authcontext} from "../context/auth-context" 
import {useContext} from "react"

function Routing(){
    const {state} = useContext(Authcontext);
  const { user_detail: {flag_authenticated},  user_detail: {flag_email_verified}  } = state;
  console.log("isLoggedIn from routing called",flag_authenticated);
    return(
        <Routes>
            {flag_authenticated ? (<>
                <Route path="/" element={<Navigate to="/VerifyEmail" />} />
                <Route path="register" element={<Register />} />
                {flag_email_verified ? (
                    (<Route path="VerifyEmail" element={<Navigate to="/Dashboard" />} />))
                    :
                    (<Route path="VerifyEmail" element={<Navigate to="/VerifyEmail" />} />)
            }
                <Route path="Reset" element={<Reset />} />
                <Route path="ResetPassword" element={<ResetPassword />} />
                <Route path="Dashboard" element={<Dashboard />} />
            </>) :
                (<>
                    <Route path="/" element={<SignIn />} />
                    <Route path="register" element={<Register />} />
                    <Route path="VerifyEmail" element={<Navigate to="/" />} />
                    <Route path="Reset" element={<Navigate to="/" />} />
                    <Route path="ResetPassword" element={<Navigate to="/" />} />
                    <Route path="Dashboard" element={<Navigate to="/" />} />
                </>)
            }
        </Routes>
    )
}
export default Routing;
import React from "react";
import SignIn from "../components/SignIn";
import Register from "../components/Register";
import VerifyEmail from "../components/VerifyEmail";
import ResetPassword from "../components/ResetPwFinal";
import Reset from "../components/ResetPwInitial";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import { Context as Authcontext } from "../context/auth-context"
import { useContext } from "react"
import VerifyLink from "../components/VerifyLink";

function Routing() {
    const { state } = useContext(Authcontext);
    const { user_detail: { flag_authenticated }, user_detail: { flag_email_verified } } = state;
    console.log("isLoggedIn from routing called", flag_authenticated);
    return (
        <Routes>
            <Route path="VerifyLink" element={<VerifyLink />} />
            <Route path="ResetPassword" element={<ResetPassword />} />
            

            {flag_authenticated ? (<>

                <Route path="Reset" element={<Reset />} />
                {flag_email_verified ?
                    (<>
                        <Route path="Dashboard" element={<Dashboard />} />
                        <Route path="*" element={<Navigate to="/Dashboard" />} />
                    </>)
                    :
                    (<>
                        (<Route path="VerifyEmail" element={<VerifyEmail />} />)
                        (<Route path="*" element={<Navigate to="/VerifyEmail" />} />))
                    </>)
                }

            </>)
                :
                (<>
                    <Route path="/SignIn" element={<SignIn />} />
                    <Route path="Register" element={<Register />} />
                    <Route path="VerifyEmail" element={<VerifyEmail />} />
                    <Route path="Reset" element={<Reset />} />
                    <Route path="Dashboard" element={<Navigate to="/SignIn" />} />
                    <Route path="*" element={<Navigate to="/SignIn" />} />

                </>)
            }

        </Routes>
    )
}
export default Routing;
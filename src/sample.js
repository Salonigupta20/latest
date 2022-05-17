
import React, { Fragment, useEffect, useState, useContext } from "react";

import {
  Box,
  TextField,
  CssBaseline,
  Container,
  Button,
  Alert,
} from "@mui/material";
import Header from "../components/header/header";
import { useSearchParams } from "react-router-dom";
import MyAdvisorCloudLogo from "../../src/assets/images/MyAdvisorCloudLogo.png";
import PremiumAllianceLogo from "../../src/assets/images/PremiumAllianceLogo.png";
import { Context as AuthContext } from "../context/auth_context";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../assets/images/bg_img2.jpg";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [flagDisableBtn, setFlagDisableBtn] = useState(1);
  const { updatepasswordcall } = useContext(AuthContext);
  const [msg, setMsg] = useState("");
  const [userEmail_Password, setUserEmail_Password] = useState({
    email: "",
    password: "",
    repassword: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("email"));

  const matchPassword = () => {
    if (userEmail_Password.password == userEmail_Password.repassword) {
      console.log("if called------------------------------------------------");
      console.log("userEmail_Password.password ", userEmail_Password.password);
      console.log("token", setSearchParams("token"));
      updatepasswordcall({
        token: searchParams.get("token"),
        password: userEmail_Password.password,
      });
      navigate("/login");
    } else {
      setMsg("Passwords do not match.");
    }
  };

  // console.log("Error message from the Login page ", error_message)

  return (
    <Fragment>
      <Header />
      <Box className="main_box" style={{height:"935px"}}>
        <CssBaseline />
        <Container fixed className="main_container">
          <div className="first_box" style={{height:"830px"}}>
            <form className="form">
              <h2 style={{ width: "500px" }}>Reset Password</h2>
              {/* <span className='errMsg'>{error_message}</span><span></span> */}
              <fieldset>
                <legend>Sign in below</legend>
                <ul>
                  <li>
                    <label for="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={searchParams.get("email")}
                      disabled
                    />
                  </li>
                  <li className="password">
                    <label for="password">Password:</label>
                    <input
                      type="password"
                      id="password"
                      required
                      value={userEmail_Password?.password}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setUserEmail_Password({
                          ...userEmail_Password,
                          password: e.target.value,
                        });
                      }}
                    />
                  </li>

                  <li className="repassword">
                    <label for="repassword">Confirm Password:</label>
                    <input
                      type="password"
                      id="password"
                      required
                      value={userEmail_Password?.repassword}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setUserEmail_Password({
                          ...userEmail_Password,
                          repassword: e.target.value,
                        });
                      }}
                    />
                  </li>
                </ul>
              </fieldset>
              {msg == "" ? <span></span> : <span>{msg}</span>}
              <Button
                className="button"
                onClick={matchPassword}
                disabled={flagDisableBtn === 0 ? true : false}
              >
                Reset
              </Button>
            </form>
          </div>
        </Container>
      </Box>
    </Fragment>
  );
};

export default ResetPassword;



services :

import Axios from "./axios";

export const ResetPasswordAPI  = async(data,onSuccess ,onError)=>{
    try{
        console.log("ID Data resetpassword in service file ",data);
        //  debugger;
        const response =await Axios.post('/api/user/resetPassword', data, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        console.log("printing responce of resetpassword in service file", response)
        //  debugger;
        onSuccess && onSuccess(response);
        // debugger;
    }
    catch(err){
        console.log("got an error",err);
        onError && onError(err)
    }
}



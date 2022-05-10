import React, { useContext } from "react";
import "../styles.css";
import '../App.css';
import { Context as AuthContext } from '../context/auth-context';
import { Outlet, useNavigate } from "react-router-dom";

function Home() {
    
    const { state } = useContext(AuthContext)
    const navigate = useNavigate();

    console.log(state)

    const goToSignIn = () => {
      navigate("/sign-in")
    }

    const goToregister = () => {
      navigate("/register")
    }

    return (
      <div className="app">
        <div className="login-form">
          <div className="title">
            <button onClick={goToSignIn}>Sign In</button>
            <button onClick={goToregister}>Register</button>
          </div>
          <Outlet />
        </div>
      </div>
    );
  }

export default Home;

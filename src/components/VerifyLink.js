import React, { useEffect, useContext } from "react";
import { Navigate, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { Context as AuthContext } from '../context/auth-context';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';







const VerifyLink = () => {
  const { state, VerifyLinkCall } = useContext(AuthContext);
  const{error_message}= state;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
 

  useEffect(()=>{
    console.log("token", token);
    if(token !== ""){
        VerifyLinkCall({token});
    }
  }, [])

  useEffect(()=>{
    console.log("Printing verifying email address", state.verifyingEmailAddress);
    setTimeout(() => {
      if(state.verifyingEmailAddress === true){
        navigate("/dashboard");
      }
      else if(state.verifyingEmailAddress === false){
        navigate("/SignIn");
      }
    }, 3000)
  }, [state.verifyingEmailAddress])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
        {error_message}
          
            {/* {state.verifyingEmailAddress ? <Navigate to="/Dashboard" /> :<Navigate to="/" />} */}
          
          <h5 style={{ display: "flex", justifyContent: "center", padding: "10px", color: "black" }}>
          
          Your Email Address has been verified.
            Redirecting...
            </h5>
        </Typography>

      </Container>
    </Box>
  );
}

export default VerifyLink;
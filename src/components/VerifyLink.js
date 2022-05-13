import React, {useEffect, useContext} from "react";
import { Navigate,useNavigate, useSearchParams, useLocation  } from "react-router-dom";
import { Context as AuthContext } from '../context/auth_context'; 
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';







const VerifyLink = () => {
  const { state, VerifyEmailCall, VerifyLinkCall } = useContext(AuthContext);
  const navigate = useNavigate();
  const {user_detail} = state;
  const location = useLocation();
  const queryParams = location;
  const [ searchParams ] = useSearchParams();
  console.log("Search Params ", searchParams)
  const token = searchParams.get('token');
  console.log("Verify Email Address called", token);
  console.log("Printing state for auth context", state);

  

  useEffect(()=>{
    
    console.log("token", token);
    if(token !== ""){
        VerifyLinkCall({token});
    }
  }, [])

  useEffect(()=>{
    console.log("Printing verifying email address", state.verifyingEmailAddress);
    

    if(state.verifyingEmailAddress === 2){
      navigate("/login");
    }
    else if(state?.verifyingEmailAddress === 3){
      navigate("/home");
    }
  }, [state?.verifyingEmailAddress])

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
        <h4 style={{display:"flex" , justifyContent:"center",padding:"10px" , paddingTop:"70px",color:"green"}}>
            {state.verifyingEmailAddress === 1 ? "We are verifying your email address" : state.verifyingEmailAddress === 2 ? "Your Email Address has been verified" : state.verifyingEmailAddress === 3 ? "Incorrect Email Address." : ""}
          </h4>
          <h4 style={{display:"flex" , justifyContent:"center",padding:"10px",color:"green"}}>
          Redirecting...</h4>
        </Typography>
        
                </Container>
            </Box>
    );
}

export default VerifyLink;
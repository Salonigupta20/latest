import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import {navigate, useNavigate} from "react-router-dom";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {Context as Authcontext} from "../context/auth-context" 
import { useState , useContext, useEffect} from 'react';
// import VerifyEmail from "./VerifyEmail"


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
       Saloni's test project
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function VerifyEmail() {
  const{VerifyEmailCall,logout, state}= useContext(Authcontext)
  //   let navigate = useNavigate();

  //   const VerifyEmail = ()=>{
  //     VerifyEmailCall()
  //   }

    const logoutcall = ()=> {
      logout()
      // navigate("/")
    }
    // const VerifyEmailCall = ()=> {
    //   VerifyEmail()
    //   // navigate("/")
    // }
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
          VERIFY EMAIL
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {"Please Verify Your Email. We've sent you an email to do the same."}
        </Typography>
        <br/>
              <Typography
                  variant="h6"
                  noWrap
                  component={Link}
                  to="/"
                  color="textPrimary"
              >
                  <button href="#" underline="none"
                  onClick={VerifyEmailCall}>
                     If you Haven't Received any email please click here.
                  </button>
              </Typography>
              <br/>
              <br/>
              <Typography
                  variant="h6"
                  noWrap
                  component={Link}
                  to="/"
                  color="textPrimary"
              >
                  <Link href="#" underline="none"
                  // onClick={VerifyEmailCall}
                  >

                     After Verification Please Click Here To Continue!
                  </Link>
              </Typography>
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
                <Container maxWidth="sm">
                    <Typography variant="body1">
                        <Link 
                            onClick={logoutcall}
                            >
                            LOGOUT
                        </Link>
                        <br/>
                        <ExitToAppIcon />
                    </Typography>
                    <Copyright />
                </Container>
            </Box>
        </Box>
    );
}

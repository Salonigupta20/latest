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

export default function Dashboard() {
//   useEffect(() => {
//     if (state.user_detail.access_token) {
//         navigate("/")
//     }
// }, [state.user_detail.access_token])

  const{logout, state}= useContext(Authcontext)
    let navigate = useNavigate();
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
          LOGIN SUCCESSFULL
        </Typography>
                </Container>
          <button 
          // onClick={() => {
          //     navigate('/');}}
          onClick={logout}
          >LOGOUT</button>
            </Box>
           
    );
}

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import {navigate, useNavigate} from "react-router-dom";
import { RegisterAPI } from '../services/RegisterCall';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Saloni's test project
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {

  let navigate = useNavigate();
  const[userExist,setUserExist]=useState("")

  const [userDetail,setUserDetail] = useState({
    first_name :"",
    last_name : "",
    email : "",
    phone: "",
    password : "" 
  })  

  const RegisterUser=()=>{
    const{first_name,last_name,email,phone,password}=userDetail;

    if(first_name==""||last_name==""||email==""||phone==""||password==""){
  alert("Please fill the required fields")}

else{

  RegisterAPI({first_name,last_name, email,password,phone},(res)=>{
    if(res?.data?.status===true){
      setUserExist("User registered successfully.");
      navigate("/VerifyEmail",{state:{email}})
    }
    else{
      setUserExist("User already exist.")
    }
    console.log("printing response of get register api",res)}
    ,(err)=>{
      alert("got error of register api",err)
  })
}
useEffect(()=>{
  console.log("userExist",userExist)
},[])
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AppRegistrationIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          {userExist == " " ?<h4> </h4> :<h4>{userExist}</h4>}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e)=>{
                   console.log("firstname",e.target.value)
                  setUserDetail({ ...userDetail, first_name: e.target.value});
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e)=>{
                   console.log("firstname",e.target.value)
                  setUserDetail({ ...userDetail, last_name: e.target.value});
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e)=>{
                   console.log("firstname",e.target.value)
                  setUserDetail({ ...userDetail, email: e.target.value});
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone no."
                  name="phone"
                  onChange={(e)=>{
                   console.log("phone",e.target.value)
                  setUserDetail({ ...userDetail, email: e.target.value});
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e)=>{
                   console.log("firstname",e.target.value)
                  setUserDetail({ ...userDetail, password: e.target.value});
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={RegisterUser}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={() => {
          navigate('/');}} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
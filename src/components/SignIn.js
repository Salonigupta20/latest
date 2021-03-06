import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState , useContext, useEffect} from 'react';
import img1 from "../images/acedata.jpg";
import {navigate, useNavigate} from "react-router-dom";
import {Context as Authcontext} from "../context/auth-context" 
import { SignInAPI } from '../services/SignInCall';

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

export default function SignIn() {

  
  let navigate = useNavigate();
  const{SignInCall,state}= useContext(Authcontext)
  const{error_message}= state;

  const [userDetail,setUserDetail] = useState(
    {
      email: "",
    password: ""
    }
  )
  
//   const LoginUser=()=>{
//     const{email,password}=userDetail;
//     if(email==""||password==""){
//           alert("Please fill the required fields");
//     }
//    else{
//   SignInAPI({email,password},(res)=>{
//     if(res.data.verify===false){
//       navigate('/VerifyEmail')
//       // setUserExist("User Registered Successfully");
//       // // setTimeout(navigate("/VerifyEmail",{state: {email}}), 60000)
//       // setTimeout(()=>navigate("/VerifyEmail"),2000)
//     }
//     else{
//       navigate('/Dashboard')
//       // setUserExist("User Already Exist. Please sign in")
//       // // setTimeout(navigate("/",{state: {email}}),60000)
//       // setTimeout(()=>navigate("/"),2000)
//     }
    
//   })
// }}

// useEffect(() => {
//         if (state.user_detail.access_token) {
//             navigate("/Dashboard")
//         }
//     }, [state.user_detail.access_token])


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
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${img1})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'contain',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <VpnKeyIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <span>{error_message}</span>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={userDetail.email}
                onChange={(e) => setUserDetail({...userDetail,email: e.target.value})}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={userDetail.password}
                onChange={(e) => setUserDetail({...userDetail,password: e.target.value})}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // onClick={LoginUser}
                onClick={()=>{
                  SignInCall({
                    "email": userDetail.email,
                    "password": userDetail.password
                  })
                  // if(res.data.flag)
                  // navigate('dashboard')
                }
                }
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link onClick={() => {
                    navigate('/Reset');
                  }} variant="body2">
                    Forgot Password? Click here to Reset.
                  </Link>
                </Grid>
                <Grid item>
                  <Link onClick= {() => {
          navigate('/Register'); }} 
           variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}


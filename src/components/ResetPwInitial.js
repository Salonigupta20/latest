import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import PasswordIcon from '@mui/icons-material/Password';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Context as AuthContext} from '../context/auth-context'

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Saloni's test project
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const theme = createTheme();




export default function Reset() {
  let navigate = useNavigate();
  
  const[mail,setMail]= useState("")
  const {ResetPasswordcall,state}= useContext(AuthContext)
  const{error_message,Email_sent}= state;
  


  const handleSubmit = (event) => {
    event.preventDefault();
  }
  useEffect(() => {
    if (Email_sent !== false) {
      ResetPasswordcall();
    }
  }, [])
  useEffect(() => {
    // setTimeout(() => {
      if (state.Email_sent === true) {
        navigate("/SignIn");
        console.log("email_sent value",Email_sent)
      }
      else if (state.Email_sent === false) {
        // navigate("/SignIn");
        console.log("email_sent value",Email_sent)
      }
  //   }, 2000)
  }, [state.Email_sent])
    

  

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
            <PasswordIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset
          </Typography>
          <span>{error_message}</span>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={mail}
                onChange={(e) => setMail(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>{
                ResetPasswordcall({
                    "email": mail
                  })
                  // if(res.data.flag)
                  // navigate('dashboard')
                }
                }
              // onClick= {ResetPasswordcall({"email":mail}) }
          //     onClick= {async () => {
                
          //     var res = await ResetPasswordcall({"email":mail}) 
          //      console.log("res from reset password call",res)
          //      if(res.status==true ){
          //        console.log("res status true reached")
          //        if (res.res.data.status)
          //         setTimeout(()=>navigate("/SignIn"),3000)
          //       else {}
          //      }
          //       else{
                  
          //       }
         
          // }} 
          
            >
             Reset
            </Button>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}

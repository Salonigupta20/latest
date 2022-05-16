import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockResetIcon from '@mui/icons-material/LockReset';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState, useContext} from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import {Context as AuthContext} from '../context/auth-context'

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

export default function ResetPassword() {


  const[giveMessage, setGiveMessage] = useState("");
  const[updated_details, SetUpdated_details]= useState(
    {
      email: "",
      password: "",
      confirm_password: ""
    }
  );
  const[SearchParams,setSearchParams] =useSearchParams();
  console.log(SearchParams.get('email'));
  const {UpdatePasswordCall} = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

  };

  const checkPassword = () => {
    if(updated_details.password==updated_details.confirm_password){
      setGiveMessage("Password reset successfull, please log in");
      console.log("token", setSearchParams("token"));
      UpdatePasswordCall({
        token: SearchParams.get("token"),
        password: updated_details.password,
      });
      // Navigate('/');
      }
      else{
        setGiveMessage("Passwords do not match");
      }
    }



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
            <LockResetIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
            disabled 
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={SearchParams.get("email")}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="New Password"
              type="password"
              id="password"
              autoComplete="new password"
              value={updated_details.password}
              onChange= {(e)=> {
                SetUpdated_details({
                  ...updated_details,
                  password: e.target.value,
                });
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Confirm Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={updated_details.confirm_password}
              onChange= {(e)=> {
                SetUpdated_details({
                  ...updated_details,
                  confirm_password: e.target.value,
                });
              }}
            />
            <div>
            {giveMessage=="" ? <span></span> : <span>{giveMessage}</span>}
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={checkPassword}
            >
              Reset Password
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals'; 
import Routing from './router/Routes';
import { BrowserRouter } from 'react-router-dom';
import VerifyEmail from './components/VerifyEmail';
import { Provider as AuthProvider } from './context/auth-context';
import VerifyLink from './components/VerifyLink';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
  <AuthProvider>
  <VerifyLink></VerifyLink>
 {/* <Routing></Routing> */}
 </AuthProvider>
 </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import createDataContext from "./create_data_context";
import { SignInAPI } from "../services/SignInCall";
import { RegisterAPI } from "../services/RegisterCall";
import { useReducer } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { verifyEmailAPI, verifyLinkAPI } from "../services/VerifyEmailServices";
import { ResetPasswordAPI } from "../services/ResetPWServices";
import { UpdatePasswordAPI } from "../services/UpdatePasswordServices";



const reducer = (state, action) => {
  switch (action.type) {
    case "setUserDetail":
      return { ...state, user_detail: action.payload };
    case "setErrorMessage":
      return { ...state, error_message: action.payload.error_message };
    case "logout":
      return { ...state, user_detail: action.payload }
    case "VerifyEmail": {
      console.log("Action payload", action.payload);
      return { ...state, user_detail: { ...state.user_detail, flag_email_verified: action.payload } }
    }
    case "verifyingEmailAddress": {
      return { ...state, verifyingEmailAddress: action.payload }
    }
    case "setdata":{
      return { ...state, updated_data: action.payload, error_message: action.payload.message };
    }
      case "error_message":{
      return { ...state, error_message: action.payload.message };
      }
      case "settingVerifyMailTrue": {
        return { ...state, user_detail: { ...state.user_detail, flag_email_verified: action.payload } }
      }
      case "setRegister": {
        return { ...state, RegisterDetail: action.payload }
      }
    default:
      return state;
  }
};

const SignInCall = (dispatch) => async ({ email, password }) => {
  
  dispatch({
    type: "setErrorMessage",
    payload: {
      error_message: ""
    }
  })
  SignInAPI({
    email,
    password
  }, (res) => {

    console.log("data", res.data)
    console.log("data.data", res.data.data)


    if (res.data.status == true) {
      if (res.data.data.verify === true) {
        dispatch({
          type: "setUserDetail",
          payload: {
            flag_email_verified: true,
            user_firstname: "",
            user_lastname: "",
            user_password: "",
            user_phone: "",
            flag_authenticated: true,
            access_token: res.data.data.accessToken,
            user_email: res.data.data.user_email,
          }
        })
      }

      else {
        dispatch({
          type: "setUserDetail",
          payload: {
            flag_email_verified: false,
            user_firstname: "",
            user_lastname: "",
            user_password: "",
            user_phone: "",
            flag_authenticated: true,
            access_token: res.data.data.accessToken,
            user_email: res.data.data.user_email,
          }
        })

      }
    }
    else {
      console.log("saloni")
      dispatch({
        type: "setErrorMessage",
        payload: {
          // error_message: "Incorrect Email address or password"
          error_message: res.data.error.message
        }
      })
      dispatch({
        type: "setUserDetail",
        payload: {
          user_firstname: "",
          user_lastname: "",
          user_password: "",
          user_phone: "",
          flag_authenticated: "",
          flag_email_verified: "",
          access_token: "",
          user_email: ""
        }
      })
    }
  });
}

const logout = (dispatch) => () => {
  dispatch({
    type: "logout",
    payload: {
      access_token: "",
      user_email: "",
      user_first_name: "",
      user_last_name: "",
      user_password: "",
      user_phone: "",
      flag_authenticated: "",
      flag_email_verified: ""
    }
  })
}


const Registercall = (dispatch) => async ({ firstname, lastname, email, phone, password }) => {
  dispatch({
    type: "setErrorMessage",
    payload: {
      error_message: ""
    }
    
  })
  RegisterAPI({
    firstname,
    lastname,
    email,
    phone,
    password
  }, (res) => {
    if (res.data.status == true) {
      dispatch({
        type: "setUserDetail",
        payload: {
          user_first_name: res.data.firstname,
          user_last_name: res.data.lastname,
          user_email: res.data.email,
          user_phone: res.data.phone,
          user_password: res.data.password,
          flag_authenticated: false,
          flag_email_verified: false
        }
      })
      dispatch({
        type: "setErrorMessage",
        payload: {
          error_message: res.data.message
        }
      })
      dispatch({
        type: "setRegister",
        payload: true
    })}
    else {
      dispatch({
        type: "setErrorMessage",
        payload: {
          error_message: res.data.error.message
        }
      })
      dispatch({
        type: "setUserDetail",
        payload: {
          user_firstname: "",
          user_lastname: "",
          user_email: "",
          user_password: "",
          user_phone: "",
          flag_authenticated: false,
          flag_email_verified: false
        }
      })
      dispatch({
        type: "setRegister",
        payload: false
    })
    }
  });
}

const VerifyEmailCall = (dispatch) => async ({ email_address }) => {
  console.log("calling the verify email", email_address)
  verifyEmailAPI({
    email_address
  },
    (res) => {
      console.log("data of email verification", res.data);
      if (res.data.status == true) {
        // Navigate("/Dashboard")
        dispatch({
          type: "setErrorMessage",
          payload: {
            error_message: res.data.data
            // error_message: "Incorrect Email Address from the verification"
          }
        })
      }
      else {
        dispatch({
          type: "setErrorMessage",
          payload: {
            error_message: res.data.error.message
            // error_message: "Incorrect Email Address from the verification"
          }
        })
        dispatch({
          type: "setUserDetail",
          payload: {
            user_firstname: "",
            user_lastname: "",
            user_email: "",
            user_password: "",
            user_phone: "",
            flag_authenticated: true,
            flag_email_verified: false

          }
        })
      }
    });
}

const VerifyLinkCall = (dispatch) => async ({ token }) => {
  // console.log("token", token)
  dispatch({
    type: "verifyingEmailAddress",
    payload: 1
  })
  
  await verifyLinkAPI({
    token
  }, (res) => {
    console.log("res.data of Verify Link Auth Context", res);
    if (res.data.status === true) {
      dispatch({
        type: "settingVerifyMailTrue",
        payload: true
      })
      dispatch({
        type: "verifyingEmailAddress",
        payload: 2
      })
      
    }
    else {
      dispatch({
        type: "verifyingEmailAddress",
        payload: 3
      })
      dispatch({
        type: "setErrorMessage",
        payload: {
          error_message: "Incorrect Email address or password from email verification page"
          // error_message: res.data.error.message
        }
      })
      dispatch({
        type: "setUserDetail",
        payload: {
          email: "",
          flag_authenticated: false
        }
      })
      console.log("status is false when done api call for verify link");
    }

  });
}


const ResetPasswordcall = (dispatch) => async ({ email, password }) => {
  ResetPasswordAPI({
     email,
     password
  }, (res)=>{
     if(res.data.status == true){
      // Navigate("/")
        dispatch({
          type:"setUserDetail",
          payload: {
            user_email:res.data.data.user_email,
            flag_authenticated: false
          }
        })
        dispatch({
          type: "setErrorMessage",
          payload: {
            // error_message: "We've sent you an email to reset your password."
            error_message: res.data.data
          }
        })
     }
     else{
      dispatch ({
        type:"setErrorMessage",
        payload: {
          // error_message:"Incorrect Email address or password"
          error_message:res.data.error.message
        }
      })
      dispatch({
        type:"setUserDetail",
        payload: {
          user_email:"",
          flag_authenticated: false
        }
      })
    }
  });
}

const UpdatePasswordCall=(dispatch) => ({email,token,password}) =>{
  dispatch({
    type: "setErrorMessage",
    payload: {
      error_message: ""
    }
  })
  UpdatePasswordAPI({
    password,token
  }, (res)=>{
    if(res.data.status== true){
      dispatch({
        type:"setdata",
        payload:{
          token: token,
          password: password,
          message: res.data.data
        }
      })
      dispatch ({
        type: "setErrorMessage",
        payload: {
          // message: "Reset Password Failed. Please try again!"
          error_message: res.data.data
        }
      })
    }
    else{
      dispatch ({
        type: "setErrorMessage",
        payload: {
          // message: "Reset Password Failed. Please try again!"
          error_message: res.data.error.message
        }
      })
    }
  });
}


export const { Provider, Context } = createDataContext(
  reducer, { SignInCall, Registercall, logout, VerifyEmailCall, VerifyLinkCall, ResetPasswordcall, UpdatePasswordCall },
  {
    user_detail: {
      access_token: "",
      user_email: "",
      user_first_name: "",
      user_last_name: "",
      user_password: "",
      user_phone: "",
      flag_authenticated: "",
      flag_email_verified: ""
    },
    verifyingEmailAddress: "",
    RegisterDetail: "",
    error_message:"",
    updated_data: {
      token: "",
      password: "",
      message: ""
    }

  });
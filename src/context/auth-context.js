import createDataContext from "./create_data_context";
import { SignInAPI } from "../services/SignInCall";
import { RegisterAPI } from "../services/RegisterCall";
import { useReducer } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { verifyEmailAPI } from "../services/VerifyEmailServices";





const reducer = (state, action) => {
  switch (action.type) {
    case "setUserDetail":
      return { ...state, user_detail: action.payload };
    case "setErrorMessage":
      return { ...state, error_message: action.payload.error_message };
      case "logout":
        return { ...state, user_detail: action.payload}
    default:
      return state;
  }
};

const SignInCall= (dispatch)=> async({email, password}) => {
  dispatch ({
    type:"setErrorMessage",
    payload: {
      error_message:""
    }
  })
  SignInAPI({
     email,
     password
  }, (res)=>{

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
        })}

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

    }}
     else{
       console.log("saloni")
      dispatch ({
        type:"setErrorMessage",
        payload: {
          error_message:"Incorrect Email address or password"
        }
      })
      dispatch({
        type:"setUserDetail",
        payload: {
          user_firstname:"",
          user_lastname:"",
          user_password :"",
          user_phone : "",
          flag_authenticated: "",
          flag_email_verified: "",
          access_token: "",
          user_email:""
        }
      })
    }
  });
}

const logout= (dispatch)=> () =>{
  dispatch({
    type: "logout",
    payload:{
      access_token: "",
    user_email:"",
    user_first_name:"",
    user_last_name:"",
    user_password :"",
    user_phone : "",
    flag_authenticated: "",
    flag_email_verified: ""
    }
  })
}
    

const Registercall = (dispatch) => async ({ firstname,lastname,email, phone,password }) => {
  dispatch ({
    type:"setErrorMessage",
    payload: {
      error_message:""
    }
  })
  RegisterAPI({
    firstname,
    lastname,
     email,
     phone,
     password
  }, (res)=>{
     if(res.data.status == true){
        dispatch({
          type:"setUserDetail",
          payload: {
            user_first_name:res.data.firstname,
            user_last_name:res.data.lastname,
            user_email:res.data.email,
            user_phone : res.data.phone,
            user_password :res.data.password,
            flag_authenticated: "",
            flag_email_verified: true
          }
        })
     }
     else{
      dispatch ({
        type:"setErrorMessage",
        payload: {
          error_message:"Incorrect Email address or password from register page"
        }
      })
      dispatch({
        type:"setUserDetail",
        payload: {
          user_firstname:"",
          user_lastname:"",
          user_email:"",
          user_password :"",
          user_phone : "",
          flag_authenticated: false,
          flag_email_verified: false
        }
      })
    }
  });
}

const VerifyEmailCall = (dispatch)=> async ({ email_address }) => {
  console.log("calling the verify email",email_address)
  verifyEmailAPI({
    email_address},
    (res)=>{
      console.log("data of email verification", res.data);
      if(res.data.status== true){
        // Navigate("/Dashboard")
      }
      else{
        dispatch({
          type:"setErrorMessage",
          payload: {
            error_message: "Incorrect Email Address from the verification"
          }
        })
        dispatch({
          type: "setUserDetail",
          payload: {
            user_firstname:"",
            user_lastname:"",
            user_email:"",
            user_password :"",
            user_phone : "",
            flag_authenticated: true,
            flag_email_verified: false

          }
        })
      }
    });
  }


// const reducer = (state, action) => {
//   switch(action.type){
//     case "updateName": {
//       return { ...state, firstName: action.payload }
//     }
//   }
// }





// const [state, dispatch] = useReducer(reducer, {
//   lastName: "",
//   email: "",
//   password: ""
// })

// dispatch({
//   firstName: null
// })



// const UpdateFirstName = dispatch => (value)=>{
//   dispatch({
//     type: "updateFirstName",
//     payload: value
//   })
// }


export const { Provider, Context } = createDataContext(
  reducer, {SignInCall, Registercall, logout, VerifyEmailCall },
  {
  user_detail: {
    access_token: "",
    user_email:"",
    user_first_name:"",
    user_last_name:"",
    user_password :"",
    user_phone : "",
    flag_authenticated: "",
    flag_email_verified: ""
  }
});
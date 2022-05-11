import createDataContext from "./create_data_context";
import { SignInAPI } from "../services/SignInCall";
import { RegisterAPI } from "../services/RegisterCall";
import { useReducer } from "react";





const reducer = (state, action) => {
  switch (action.type) {
    case "setUserDetail":
      return { ...state, user_detail: action.payload };
    case "setErrorMessage":
      return { ...state, error_message: action.payload.error_message };
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
    //  console.log("Login call successfull response",res.data);
     if(res.data.status == true){
        dispatch({
          type:"setUserDetail",
          payload: {
            access_token: res.data.data.accessToken,
            user_email:res.data.data.user_email,

          }
        })
     }
     else{
      dispatch ({
        type:"setErrorMessage",
        payload: {
          error_message:"Incorrect Email address or password"
        }
      })
      dispatch({
        type:"setUserDetail",
        payload: {
          access_token: "",
          user_email:"",
        }
      })
    }
  });
}

const Registercall = (dispatch) => async ({ firstname,lastname,email, password,phone }) => {
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
     password,
     phone
  }, (res)=>{
     console.log("res.data",res.data); 
     if(res.data.status == true){
        dispatch({
          type:"setUserDetail",
          payload: {
            user_firstname:res.data.firstname,
            user_lastname:res.data.lastname,
            user_email:res.data.email,
            user_password :res.data.password,
            user_phone : res.data.phone,
            flag_authenticated: true,
            flag_email_verified: false
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
  reducer, {SignInCall, Registercall },
  {
  userDetail: {
    access_token: "",
    user_email:"",
  }
});
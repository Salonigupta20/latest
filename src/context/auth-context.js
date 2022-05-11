import createDataContext from "./create_data_context";
import { SignInAPI } from "../services/SignInCall";
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
  reducer, {SignInCall},
  {
  userDetail: {
    access_token: "",
    user_email:"",
  }
});
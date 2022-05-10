import actionTypes from "../constants/actionTypes";
import createDataContext from "./create_data_context";
import database from "../constants/db";

const initialState = {
  isLoggedIn: false,
  isError: false,
  username: null,
  password: null,
  database
}

const reducer = (state, action) => {


  switch (action.type) {
    case actionTypes.LOGIN: {
      return { ...state, isLoggedIn: action.payload.isLoggedIn, isError: action.payload.isError, username: action.payload.username }
    }
    case actionTypes.LOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
        isError: false,
        username: null,
        password: null
      }
    }
    case actionTypes.REGISTER: {
      return { ...state, database: [ ...state.database, { 
        username: action.payload.uname,
        password: action.payload.pass
       } ] }
    }
  }
};


const login = (dispatch) => ({ uname, pass }) => {
  dispatch({ type:actionTypes.LOGIN, payload: { uname, pass } })

  const userData = database.find((user) => user.username === uname);
  console.log("user data", userData);

   if(!userData || userData.password !== pass){
    dispatch({ type:actionTypes.LOGIN, payload: { isError: true, isLoggedIn: false, username: null } })
  }
  else{
    dispatch({ type:actionTypes.LOGIN, payload: { isLoggedIn: true, isError: false, username: uname } })
  }

  
}
const logout = (dispatch) => () => {
  dispatch({ type: actionTypes.LOGOUT })
}

const register = (dispatch) => ({ uname, pass }) => {
  dispatch({ type:actionTypes.REGISTER, payload: { uname, pass } })
}


const actionsObj = { login, logout,register };

export const { Provider, Context } = createDataContext(reducer, actionsObj, initialState);

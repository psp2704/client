import axios from "axios";
import { createContext, useReducer, useState } from "react";


export const API_URL_USER = "http://localhost:7000/api/v1/user";

//create the aulthe context
export const AuthContext = createContext();


//crete initial state 
const INITIAL_STATE = {
    userAuth : false,
    loading : false,
    profie : null,
    error : null,
}

//craete the reducer 
const reducer = (state, action) => {
    const {type , payload} = action;
    switch (type) {
        //Register
        case "REGISTER_SUCCESS":
          return {
            ...state,
            loading: false,
            error: null,
            userAuth: payload,
          };
        case "REGISTER_FAIL":
          return {
            ...state,
            error: payload,
            loading: false,
            userAuth: null,
          };
    
        case "LOGIN_SUCCESS":
          //Add user to localstorage
          localStorage.setItem("userAuth", JSON.stringify(payload));
          return {
            ...state,
            loading: false,
            error: null,
            userAuth: payload,
          };
        case "LOGIN_FAILED":
          return {
            ...state,
            error: payload,
            loading: false,
            userAuth: null,
          };
        // Profile
        case "FETCH_PROFILE_SUCCESS":
          return {
            ...state,
            loading: false,
            error: null,
            profile: payload,
          };
        case "FETCH_PROFILE_FAIL":
          return {
            ...state,
            loading: false,
            error: payload,
            profile: null,
          };
        // logout
        case "LOGOUT":
          //remove from storage
          localStorage.removeItem("userAuth");
          return {
            ...state,
            loading: false,
            error: null,
            userAuth: null,
          };
        default:
          return state;
      }
}

// create the provider for the context 
export const AuthContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);


    //login action
    const  login = (formdata) => async ()=>{
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }
        try {
           const res = await axios.post(`${API_URL_USER}/login`, formdata ,config);

        //    if(res?.data?.status === "success"){
        //     dispatch({
        //         type : "LOGIN_SUCCESS",
        //         payload : res.data
        //     })
        //    }
        console.log(res)
        console.log('successfully logged')

        } catch (error) {
            console.log(error)
            // dispatch({
            //     type: 'LOGIN_FAILED',
            //     payload: error?.response?.data?.message,
            //   });
        }
    }
    return (
        <AuthContext.Provider value={{state, login}}>
            {children}
        </AuthContext.Provider>
    )
}
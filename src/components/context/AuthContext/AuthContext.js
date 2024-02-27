import axios from "axios";
import { createContext, useReducer, useState } from "react";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  FETCH_PROFILE_FAIL,
  FETCH_PROFILE_SUCCESS,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./authActionTypes";

export const API_URL_USER = "http://localhost:7000/api/v1/user";

//create the aulthe context
export const AuthContext = createContext();

//crete initial state 
const INITIAL_STATE = {
  userAuth: JSON.parse(localStorage.getItem("userAuth")),
  loading: false,
  profie: null,
  error: null,
}

//craete the reducer 
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    //Register
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userAuth: payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
        userAuth: null,
      };

    case LOGIN_SUCCESS:
      //Add user to localstorage
      localStorage.setItem("userAuth", JSON.stringify(payload));
      return {
        ...state,
        loading: false,
        error: null,
        userAuth: payload,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        error: payload,
        loading: false,
        userAuth: null,
      };
    // Profile
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        profile: payload,
      };
    case FETCH_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        profile: null,
      };
    case "ERROR":
      return {
        ...state,
        loading: false,
        error: payload,
        profile: null,
      };
    // logout
    case LOGOUT:
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
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  //login action
  const login = async (formdata) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post(`${API_URL_USER}/login`, formdata, config);
      if (res?.data?.status === "success") {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        })
      }
      //Redirect
      window.location.href = "/dashboard"
    } catch (error) {
      dispatch({
        type: LOGIN_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  }

  //get the user profile
  const getProfile = async () => {

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state?.userAuth?.token}`
      }
    }
    try {
      const res = await axios.get(`${API_URL_USER}/profile`, config);
      dispatch({ type: FETCH_PROFILE_SUCCESS, payload: res.data })
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error?.response?.data?.message
      })
    }
  };

  //logout
  const logoutUser = async () => {

    localStorage.removeItem("userAuth");
    try {
      dispatch({ type: LOGOUT });

      //Redirect
      window.location.href = "/"
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error?.response?.data?.message
      })
    }
  }

  return (
    <AuthContext.Provider value={{ state, token: state?.userAuth?.token, profile:state?.profile, login, getProfile, error: state?.error, logoutUser }}>
      {children}
    </AuthContext.Provider>
  )
}
/* eslint-disable no-unused-vars */
import { authSlice, resetState, setLoginResponse, setMessage } from "./authSlice";
import { login, signout, signup } from "../../Api/services/authService";
import { useDispatch } from "react-redux";
// import { AnyAction, ThunkAction } from "@reduxjs/toolkit";

const authActions = authSlice.actions;

//Login
export const loginAction = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await login(email, password);
      console.log("response", response);
      dispatch(setLoginResponse(response));
    } catch (error) {
      dispatch(setMessage(error.response.data.message));
    }
  };
};

//Sign Up
export const signUpAction = (name, mobile, email, password, role) => {
  return async (dispatch) => {
    try {
      const response = await signup(name, mobile, email, password, role);
      console.log("response", response);
      dispatch(setLoginResponse(response));
    } catch (error) {
      dispatch(setMessage(error.response.data.message));
    }
  };
};

//Sign Out
export const signOutAction = () => {
  return async (dispatch) => {
    try {
      dispatch(resetState());
      const response = await signout();
      console.log("response", response);

      // ... other logic
    } catch (error) {
      console.error("Sign out error:", error);
      if (error.response && error.response.data && error.response.data.message) {
        dispatch(setMessage(error.response.data.message));
      } else {
        console.error("Sign out error:", error);
        dispatch(setMessage("An error occurred while signing out."));
      }
    }
  };
};

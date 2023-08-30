import axios from "axios";
import { apiClient } from "../axios/api";

//Authentication Login
export const login = async (email, password) => {
  const response = await apiClient.post(`user/login`, {
    email: email,
    password: password,
  });
  return response.data;
};

//Authentication SignUp
export const signup = async (name, mobile, email, password, role) => {
  const response = await apiClient.post(`user/signup`, {
    name: name,
    mobile: mobile,
    email: email,
    password: password,
    role: role,
  });
  return response.data;
};

//Authentication SignOut
export const signout = async () => {
  axios.defaults.withCredentials = true;
  const config = {
    withCredentials: true,
  };

  console.log("withCredentials:", config.withCredentials);

  const response = await apiClient.post('User/logout');
  return response.data;
};

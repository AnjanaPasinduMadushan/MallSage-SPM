import { createSlice } from "@reduxjs/toolkit";

// Define a function to fetch the initial state
const getInitialAuthState = () => {
  const persistedState = localStorage.getItem("persistroot");
  if (persistedState) {
    console.log("JSON.parse(persistedState)", JSON.parse(persistedState));
    return JSON.parse(persistedState);
  }

  // If persisted state doesn't exist, use the default initial state
  return {
    message: "",
    User: {
      _id: "",
      name: "",
      mobile: "",
      email: "",
      password: "",
      role: "",
    },
    token: "",
  };
};

export const authSlice = createSlice({
  name: "auth",
  initialState: getInitialAuthState(),
  reducers: {
    setLoginResponse: (state, action) => {
      return {
        ...state,
        User: action.payload.User,
        token: action.payload.token,
        message: action.payload.message,
      };
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = "";
      state.logOutMessage = "";
    },
    logOut: (state, action) => {
      state.access_token = "";
      state.name = "";
      state.mobile = "";
      state.email = "";
      state.password = "";
      state.token = "";
      state.role = "";
      state.logOutMessage = action.payload;
    },


//Sign Out
resetState: (state) => {
  localStorage.removeItem("persistroot");
  const initialState = getInitialAuthState();
  Object.keys(initialState).forEach((key) => {
    state[key] = initialState[key];
  });
},
},
});
export const { setLoginResponse, logOut, setMessage, clearMessage,resetState } =
  authSlice.actions;
export default authSlice.reducer;

import { configureStore, createSlice } from '@reduxjs/toolkit'

const authenticationSlice = createSlice({
  name: 'auth',
  initialState: { isLogged: false },
  reducers: {
    login(state) {
      state.isLogged = true
    },
    logOut(state) {
      state.isLogged = false
    },

  }
})

export const autheticationActions = authenticationSlice.actions;

export const store = configureStore({
  reducer: authenticationSlice.reducer
})
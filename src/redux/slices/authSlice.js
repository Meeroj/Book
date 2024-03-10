import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLoggedIn: false,
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.user = {...action.payload}
      state.isLoggedIn = true
    },
    signOut: (state) => {
      state.user = {}
      state.isLoggedIn = false
    }
  }
})

export const {signIn, signOut} = authSlice.actions
export default authSlice.reducer
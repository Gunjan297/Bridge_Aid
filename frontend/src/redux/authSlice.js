import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
  },
  reducers: {
    // actions
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;


//action.payload:
// In Redux (and Redux Toolkit), an action is simply an object that describes what happened.
// It usually looks like this:

// {
//   type: "setUser",
//   payload: { name: "Gunjan", email: "gunjan@example.com" }
// }
// type: Describes what action is happening (e.g., "setUser").

// payload: Contains the data you want to send to the reducer.
// So when you see action.payload, it just refers to the data you passed when dispatching the action.

//slice:
//The current data managed by that slice
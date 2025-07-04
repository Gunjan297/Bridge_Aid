import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applicants: [],
  },
  reducers: {
    // actions
    setAllapplicants: (state, action) => {
      state.applicants = action.payload;
    },
  },
});
export const { setAllapplicants } = applicationSlice.actions;
export default applicationSlice.reducer;

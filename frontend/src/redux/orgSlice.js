import { createSlice } from "@reduxjs/toolkit";

const orgSlice = createSlice({
  name: "org",
  initialState: {
    singleOrg: null,
    allOrg: [],
    searchOrgByText: "",
  },
  reducers: {
    // actions
    setSingleOrg: (state, action) => {
      state.singleOrg = action.payload;
    },
    setAllOrg: (state, action) => {
      state.allOrg = action.payload;
    },
    setSearchOrgByText: (state, action) => {
      state.searchOrgByText = action.payload;
    },
  },
});
export const { setSingleOrg, setAllOrg, setSearchOrgByText } = orgSlice.actions;
export default orgSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const schemeSlice = createSlice({
  name: "scheme",
  initialState: {
    allSchemes: [],
    allAdminSchemes: [],
    singleScheme: null,
    searchSchemeByText: "",
    allAppliedSchemes: [],
    searchedQuery: [],
  },
  reducers: {
    // actions
    setAllSchemes: (state, action) => {
      state.allSchemes = action.payload;
    },
    setSingleScheme: (state, action) => {
      state.singleScheme = action.payload;
    },
    setAllAdminSchemes: (state, action) => {
      state.allAdminSchemes = action.payload;
    },
    setSearchSchemeByText: (state, action) => {
      state.searchSchemeByText = action.payload;
    },
    setAllAppliedSchemes: (state, action) => {
      state.allAppliedSchemes = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
  },
});
export const {
  setAllSchemes,
  setSingleScheme,
  setAllAdminSchemes,
  setSearchSchemeByText,
  setAllAppliedSchemes,
  setSearchedQuery,
} = schemeSlice.actions;

export default schemeSlice.reducer;

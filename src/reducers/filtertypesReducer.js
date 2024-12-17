import { manageFilterTypes } from '../thunks/filterTypesThunk';
import { createSlice } from '@reduxjs/toolkit';

const filtertypesSlice = createSlice({
  name: 'filtertypes',
  initialState: {
    filtertypes: null,
    loading: false, 
    error: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(manageFilterTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(manageFilterTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.filtertypes = action.payload;
        state.error = '';
      })
      .addCase(manageFilterTypes.rejected, (state, action) => {
        state.loading = false;
        state.filtertypes = null; 
        state.error = action.error.message;
      })


  },
});

export default filtertypesSlice.reducer;

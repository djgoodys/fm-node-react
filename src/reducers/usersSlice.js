import { createSlice } from '@reduxjs/toolkit';
import { manageUsers } from '../thunks/usersThunk';


const usersSlice = createSlice({
  name: 'users',
  initialState: {
    loading: false, 
    users: null,  // Set to null for consistency
    error: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(manageUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(manageUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = '';
      })
      .addCase(manageUsers.rejected, (state, action) => {
        state.loading = false;
        state.users = null;  // Set to null for consistency
        state.error = action.error.message;
      })

  },
});

export default usersSlice.reducer;

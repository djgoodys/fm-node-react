import { createSlice } from '@reduxjs/toolkit';
import { Login } from '../thunks/loginThunk';


const loginSlice = createSlice({
  name: 'userData',
  initialState: {
    loggedIn: false,
    loading: false, 
    userData: null,  // Set to null for consistency
    error: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Login.pending, (state) => {
        state.loading = true;
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
       
        if (action.payload.login === "passed") {
          state.loggedIn = true;
        }
        state.error = '';
      })
      .addCase(Login.rejected, (state, action) => {
        state.loading = false;
        state.userData = null;  // Set to null for consistency
        state.loggedIn = false;
        state.error = action.error.message;
      })

  },
});

export default loginSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { manageStorage} from '../thunks/storageThunk';

const initialState = { 
    loading: false, 
    storage: [], 
    error:''
}

const storageSlice = createSlice({
  name: 'storage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(manageStorage.pending, (state) => {
        state.loading = true;
      })
      .addCase(manageStorage.fulfilled, (state, action) => {
        state.loading = false;
        state.storage = action.payload;
        state.error = ''
      }
    )
      .addCase(manageStorage.rejected, (state, action) => {
        state.loading = false
        state.storage = []
        state.error = action.error.message;
      });
  },
});

export default storageSlice.reducer
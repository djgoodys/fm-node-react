import { createSlice } from '@reduxjs/toolkit';
import { manageEquipment } from '../thunks/equipmentThunk';


const equipmentSlice = createSlice({
  name: 'equipment',
  initialState: {
    equipment: null,
    loading: false, 
    error: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(manageEquipment.pending, (state) => {
        state.loading = true;
      })
      .addCase(manageEquipment.fulfilled, (state, action) => {
        state.loading = false;
        state.equipment = action.payload;
        state.error = '';
      })
      .addCase(manageEquipment.rejected, (state, action) => {
        state.loading = false;
        state.equipment = null;  // Set to null for consistency
        state.error = action.error.message;
      })


  },
});

export default equipmentSlice.reducer;


import { createAsyncThunk } from '@reduxjs/toolkit';

export const manageEquipment = createAsyncThunk (
    'equipment/manageEquipment',
    async () =>{
        const response = await fetch(`${process.env.REACT_APP_NODEJS_SERVER}/equipment`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        })
        if(!response.ok){
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        return data
    }
)

import { createAsyncThunk } from '@reduxjs/toolkit';

export const manageStorage = createAsyncThunk (
    'storage/manageStorage',
    async (vars) =>{
        const response = await fetch(`${process.env.REACT_APP_NODEJS_SERVER}/api/storage?action=${vars.action}&id=${vars.id}&location=${vars.location}`, {
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

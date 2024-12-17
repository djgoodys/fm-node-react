import { createAsyncThunk } from '@reduxjs/toolkit';

export const manageFilterTypes= createAsyncThunk (
    'filtertypes/manageFilterTypes',
    async (obj) =>{
        const response = await fetch(`${process.env.REACT_APP_NODEJS_SERVER}/api/filtertypes?action=${obj.action}&trackable=${obj.trackable}&id=${obj.id}&type=${obj.type}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        })
        if(!response.ok){
          console.log("from filtertypesThunk: network error")
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        return data
    }
)

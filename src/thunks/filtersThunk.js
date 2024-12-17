import { createAsyncThunk } from '@reduxjs/toolkit';

export const manageFilters = createAsyncThunk (
    'filters/manageFilters',
    async (vars) =>{
        const response = await fetch(`${process.env.REACT_APP_NODEJS_SERVER}/api/filters?action=${vars.action}&id=${vars.id}&size=${vars.size}&type=${vars.type}&count=${vars.count}&notes=${vars.notes}&par=${vars.par}&storage=${vars.storage}&pn=${vars.pn}&searchwords=${vars.searchwords}&sortby=${vars.sortby}`, {
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

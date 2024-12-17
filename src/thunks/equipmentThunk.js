
import { createAsyncThunk } from '@reduxjs/toolkit';

export const manageEquipment = createAsyncThunk (
    'equipment/manageEquipment',
    async (obj) =>{
        const response = await fetch(`${process.env.REACT_APP_NODEJS_SERVER}/api/equipment?action=${obj.action}&unit_id=${obj.unit_id}&rotation=${obj.rotation}&filter_type=${obj.filter_type}&username=${obj.username}&newtasks=${obj.task_array}&searchwords=${obj.searchwords}&sortby=${obj.sortby}&notes=${obj.notes}&field=${obj.field}&filter_size=${obj.filter_size}&assigned_to=${obj.assigned_to}&filters_due=${obj.filters_due}&area_served=${obj.area_served}&location=${obj.location}&belts=${obj.belts}&unit_name=${obj.unit_name}`, {
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

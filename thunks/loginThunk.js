import { createAsyncThunk } from '@reduxjs/toolkit';

export const Login = createAsyncThunk(
  'userData/Login',
  async (obj, { rejectWithValue }) => {
    console.log("from loginThunk.js logging in");
    const formData = new FormData();
    formData.append('username', obj.username);
    formData.append('password', obj.password);
    formData.append('action', obj.action);


    try {
      const response = await fetch(`${process.env.REACT_APP_NODEJS_SERVER}/users`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

import { createAsyncThunk } from '@reduxjs/toolkit';

export const Login = createAsyncThunk(
  'userData/Login',
  async (obj, { rejectWithValue }) => {

    try {
      const response = await fetch(`${process.env.REACT_APP_NODEJS_SERVER}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          username: obj.username,
          password: obj.password,
          action: obj.action
        }),
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

import { createAsyncThunk } from '@reduxjs/toolkit';

export const manageUsers = createAsyncThunk(
  'users/manageUsers',
  async (obj) => {
    const queryParams = new URLSearchParams({
      username: obj.username,
      password: obj.password,
      action: obj.action,
      id: obj.id,
      admin: obj.admin,
      email: obj.email
    }).toString();

    const response = await fetch(`${process.env.REACT_APP_NODEJS_SERVER}/api/users?${queryParams}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  }
);

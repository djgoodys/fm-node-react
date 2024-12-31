import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import loginSlice from '../reducers/loginReducer';
import usersSlice from '../reducers/usersSlice';
import equipmentSlice from '../reducers/equipmentReducer';
import filtertypesSlice from '../reducers/filtertypesReducer';
import filtersSlice from '../reducers/filtersReducer'
import storageSlice from '../reducers/storageReducer'
import tasksSlice from '../reducers/tasksSlice';
import { thunk } from 'redux-thunk'; 
import componentSlice from '../reducers/componentReducer'

const rootReducer = combineReducers({
  component:componentSlice,
  userData: loginSlice,
  equipment: equipmentSlice,
  filtertypes: filtertypesSlice,
  tasks: tasksSlice,
  users: usersSlice,
  filters: filtersSlice,
  storage: storageSlice
});

// Create the Redux store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
});

export default store;

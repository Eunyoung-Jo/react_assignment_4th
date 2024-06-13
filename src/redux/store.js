import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./slices/expensesSlice";
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    auth: authReducer,
    
  },
});

export default store;

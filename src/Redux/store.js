import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import adminReducer from "./slices/adminSlice";
import dashboardReducer from "./slices/dashboardSlice";
import verificationReducer from "./slices/verificationSlice";
import paymentReducer from "./slices/paymentSlice";
import passwordResetReducer from './slices/passwordResetSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    dashboard: dashboardReducer,
    verification: verificationReducer,
    payment: paymentReducer,
    passwordReset: passwordResetReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

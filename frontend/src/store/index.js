import { configureStore } from '@reduxjs/toolkit';
import lawyerReducer from './slices/lawyerSlice';
import appointmentReducer from './slices/appointmentSlice';
import chatReducer from './slices/chatSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    lawyer: lawyerReducer,
    appointments: appointmentReducer,
    chat: chatReducer,
    notifications: notificationReducer
  }
}); 
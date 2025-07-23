import { isRejectedWithValue } from '@reduxjs/toolkit';
import { addNotification } from '../store/slices/notificationSlice';

export const errorMiddleware = (store) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const error = action.payload;
    
    // Handle authentication errors
    if (error.status === 401) {
      store.dispatch(addNotification({
        type: 'error',
        message: 'Session expired. Please login again.',
        title: 'Authentication Error'
      }));
      // Redirect to login
      window.location.href = '/lawyer/login';
    }
    
    // Handle validation errors
    else if (error.status === 422) {
      store.dispatch(addNotification({
        type: 'error',
        message: 'Please check your input and try again.',
        title: 'Validation Error'
      }));
    }
    
    // Handle server errors
    else if (error.status >= 500) {
      store.dispatch(addNotification({
        type: 'error',
        message: 'Something went wrong. Please try again later.',
        title: 'Server Error'
      }));
    }
    
    // Handle network errors
    else if (error.name === 'NetworkError') {
      store.dispatch(addNotification({
        type: 'error',
        message: 'Please check your internet connection.',
        title: 'Network Error'
      }));
    }
    
    // Log error to monitoring service
    console.error('API Error:', error);
  }

  return next(action);
}; 
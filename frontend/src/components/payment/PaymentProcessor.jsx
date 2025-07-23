import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { razorpayService } from '../../services/payment/RazorpayService';
import { addNotification } from '../../store/slices/notificationSlice';
import LoadingSpinner from '../common/LoadingSpinner';
import './PaymentProcessor.css';

const PaymentProcessor = ({ amount, onSuccess, onFailure }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handlePayment = async () => {
    try {
      setLoading(true);
      
      // Initialize Razorpay
      const razorpayLoaded = await razorpayService.initializeRazorpay();
      if (!razorpayLoaded) {
        throw new Error('Razorpay SDK failed to load');
      }

      // Create order
      const orderData = await razorpayService.createOrder(amount);
      
      // Get user details from localStorage
      const userDetails = JSON.parse(localStorage.getItem('lawyer'));

      // Process payment
      await razorpayService.processPayment(orderData, userDetails);
      
      dispatch(addNotification({
        type: 'success',
        message: 'Payment successful!'
      }));
      
      onSuccess && onSuccess(orderData);
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: error.message || 'Payment failed. Please try again.'
      }));
      onFailure && onFailure(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-processor">
      <button 
        className="payment-button"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? (
          <LoadingSpinner size="small" color="white" />
        ) : (
          <>
            <i className="fas fa-credit-card"></i>
            Pay ₹{amount}
          </>
        )}
      </button>
    </div>
  );
};

export default PaymentProcessor; 
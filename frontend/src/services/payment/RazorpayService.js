import { loadScript } from '../../utils/scriptLoader';

class RazorpayService {
  constructor() {
    this.key = process.env.REACT_APP_RAZORPAY_KEY;
    this.currency = 'INR';
  }

  async initializeRazorpay() {
    return await loadScript('https://checkout.razorpay.com/v1/checkout.js');
  }

  async createOrder(amount) {
    try {
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('lawyer_token')}`
        },
        body: JSON.stringify({ amount })
      });
      return await response.json();
    } catch (error) {
      throw new Error('Error creating order');
    }
  }

  async processPayment(orderData, userDetails) {
    const options = {
      key: this.key,
      amount: orderData.amount,
      currency: this.currency,
      name: 'LegalEase',
      description: 'Legal Consultation Payment',
      order_id: orderData.id,
      handler: async (response) => {
        try {
          await this.verifyPayment(response);
          return response;
        } catch (error) {
          throw new Error('Payment verification failed');
        }
      },
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.phone
      },
      theme: {
        color: '#2c3e50'
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }

  async verifyPayment(paymentData) {
    try {
      const response = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('lawyer_token')}`
        },
        body: JSON.stringify(paymentData)
      });
      return await response.json();
    } catch (error) {
      throw new Error('Payment verification failed');
    }
  }
}

export const razorpayService = new RazorpayService(); 
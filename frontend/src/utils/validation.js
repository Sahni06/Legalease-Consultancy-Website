export const validation = {
  email: (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  phone: (phone) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
  },

  password: (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
  },

  barCouncilNumber: (number) => {
    // Customize based on your requirements
    const regex = /^[A-Z]{2}\/[0-9]{4}\/[0-9]{4}$/;
    return regex.test(number);
  }
}; 
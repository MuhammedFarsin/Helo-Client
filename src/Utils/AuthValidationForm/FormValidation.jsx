// auth/validationForm.js

const validateUsername = (username) => {
  const normalizedUsername = username.toLowerCase();
  const isValid = /^[a-z0-9]{3,}$/.test(normalizedUsername);
  return isValid ? "" : "Username must be at least 3 characters and contain only letters and numbers.";
};

const validateEmail = (email) => {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Simple email regex
  return isValid ? "" : "Please enter a valid email address.";
};

const validatePhone = (phone) => {
  const isValid = /^\d{10}$/.test(phone); // 10-digit phone number
  return isValid ? "" : "Please enter a valid 10-digit phone number.";
};

const validatePassword = (password) => {
  const isValid = password.length >= 6; // At least 6 characters
  return isValid ? "" : "Password must be at least 6 characters long.";
};

export const validateForm = (formData, isSignUp = true) => {
  const { username, email, phone, password } = formData;

  const errors = {
    username: validateUsername(username), // Case-insensitive
    email: isSignUp ? validateEmail(email) : "", // Email validation only for signup
    phone: isSignUp ? validatePhone(phone) : "", // Phone validation only for signup
    password: validatePassword(password),
  };

  return errors;
};

// src/Utils/AuthValidationForm/FormValidation.js
export const validateForm = (formData = true) => {
    const errors = {
      username: "",
      password: "",
    };
  
    // Username validation with case-insensitive check
    const normalizedUsername = formData.username.trim().toLowerCase(); 
    if (!normalizedUsername || normalizedUsername.length < 3) {
      errors.username = "User not found...!";
    }
  
    // Password validation
    if (!formData.password || formData.password.length < 6) {
      errors.password = "Incorrect password...!";
    }
  
    return errors;
  };
  
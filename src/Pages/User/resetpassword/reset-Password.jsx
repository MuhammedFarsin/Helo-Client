import { useState } from "react";
import "./reset-Password.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="reset-container">
      <h2>Reset Your Password</h2>
      <p>Enter your new password below</p>
      <form>
        <div className="input-container">
          <input 
            type={showPassword ? "text" : "password"} 
            name="new-password" 
            placeholder="New Password" 
            className="input-field" 
            required 
          />
          <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="input-container">
          <input 
            type={showPassword ? "text" : "password"} 
            name="confirm-password" 
            placeholder="Confirm Password" 
            className="input-field" 
            required 
          />
          <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button type="submit" className="submit-button">Continue</button>
      </form>
    </div>
  );
}

export default ResetPassword;

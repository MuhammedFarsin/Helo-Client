import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import axiosInstance from "../../../Axios/axios";
import "./signup.css";

function SignUpPage() {
  // Declare state for form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  // Declare state for success and error messages
  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to the backend
      const response = await axiosInstance.post("/signup", formData);
      console.log(response.data);

      // Set success message and navigate to OTP page
      toast.success("Verify your OTP...!");
      setTimeout(() => navigate("/verify-otp"), 2000);
    } catch {
      // Handle error case
      toast.error("Failed to create an account. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <img src="/src/assets/imageProject/logo.jpg" alt="Logo" />
        </div>
        <h2>Sign Up</h2>
        <p>
          Already have an account? <a href="/">Log in</a>
        </p>

        {/* Google Sign Up Button */}
        <button className="social-login google">
          <FcGoogle size={20} />
          Log in with Google
        </button>

        <div className="divider">
          <span>OR</span>
        </div>


        <form style={{marginTop: '0.5rem'}} onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              required
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <input
              type="tel"
              placeholder="Mobile number"
              required
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <span className="toggle-password">Hide</span>
          </div>
          <button className="login-button">Create an account</button>
        </form>

      </div>
    </div>
  );
}

export default SignUpPage;

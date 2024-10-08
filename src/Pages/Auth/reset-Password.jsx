import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosInstance from "../../../Axios/axios";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await axiosInstance.post("/reset-password", {
        newpassword: newPassword,
      });

      if (response.status === 200) {
        navigate("/login");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Error resetting password. Please try again.");
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('/src/assets/imageProject/vecteezy_abstract-orange-wavy-background-orange-background-with_35768911.jpg')",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-96 max-w-full text-center">
        <h2 className="mb-2 text-2xl font-bold">Reset Your Password</h2>
        <p className="mb-5 text-gray-600">Enter your new password below</p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="relative mb-5">
            <input
              type={showPassword ? "text" : "password"}
              name="newpassword"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-orange-500"
              required
            />
            <span
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500 text-lg"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="relative mb-5">
            <input
              type={showPassword ? "text" : "password"}
              name="confirm-password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-orange-500"
              required
            />
            <span
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500 text-lg"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-orange-500 text-white rounded-lg text-lg hover:bg-orange-600"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;

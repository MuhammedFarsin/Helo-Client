import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosInstance from "../../Axios/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ToasterHot from "../Common/ToasterHot";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await axiosInstance.post("/reset-password", {
        newpassword: newPassword,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 500);
      }
    } catch (err) {
      toast.error(err.response.message);
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
        <ToasterHot/>
        <button
          onClick={() => navigate("/")}
          className="mt-4 w-full p-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;

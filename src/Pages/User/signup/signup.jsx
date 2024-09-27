import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import axiosInstance from "../../../Axios/axios";

function SignUpPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/signup", formData);
      console.log(response.data);
      toast.success("Verify your OTP...!");
      setTimeout(() => navigate("/verify-otp"), 2000);
    } catch {
      toast.error("Failed to create an account. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat p-4" style={{ backgroundImage: "url('/src/assets/imageProject/vecteezy_abstract-orange-wavy-background-orange-background-with_35768911.jpg')" }}>
      {/* Increase the max-width to max-w-sm or max-w-md here */}
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-center mb-3">
          <img src="/src/assets/imageProject/logo.jpg" alt="Logo" className="w-11 rounded-full" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">Sign Up</h2>
        <p className="text-gray-600 text-center mb-2">
          Already have an account? <a href="/" className="text-orange-600 hover:underline">Log in</a>
        </p>

        <button className="w-80 ml-4 flex items-center justify-center bg-white border border-gray-300 py-2 rounded-md mb-2 hover:bg-gray-100 transition">
          <FcGoogle size={20} />
          <span className="ml-2">Sign up with Google</span>
        </button>

        <div className="flex items-center my-2 w-80 ml-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <form className="w-80 ml-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              required
            />
          </div>
          <div className="mb-4 relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              required
            />
          </div>
          <div className="mb-4 relative">
            <input
              type="tel"
              name="phone"
              placeholder="Mobile number"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              required
            />
          </div>
          <div className="mb-4 relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-orange-600 text-white rounded-md hover:bg-orange-500 transition"
          >
            Create an account
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;

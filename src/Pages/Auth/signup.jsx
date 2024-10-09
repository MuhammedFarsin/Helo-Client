import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import axiosInstance, { googleAuth } from "../../Axios/axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/Slices/userSlice";
import { login } from "../../Redux/Slices/authSlice";
import { useGoogleLogin } from "@react-oauth/google";
import { validateForm } from "../../Utils/AuthValidationForm/FormValidation";
import ToasterHot from "../Common/ToasterHot";

function SignUpPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);

    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== ""
    );
    if (hasErrors) {
      Object.values(validationErrors).forEach((error) => {
        if (error) {
          toast.error(error);
        }
      });
      return;
    }

    try {
      const response = await axiosInstance.post("/signup", formData);
      console.log(response.data);
      localStorage.setItem("email", response.data.tempUser.email);
      toast.success("Verify your OTP...!");
      setTimeout(() => navigate("/verify-otp"), 2000);
    } catch (error) {
      toast.error("Failed to create an account. Please try again.");
      console.error(error);
    }
  };

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const response = await googleAuth(authResult["code"]);

        localStorage.setItem("accessToken", response.data.token);
        dispatch(login());
        dispatch(setUser(response.data.user));
        toast.success("Login successful!");
      } else {
        console.error("No authorization code received");
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      toast.error("Login failed");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: (error) => {
      console.error("Login Failed:", error);
      toast.error("Login failed");
    },
    flow: "auth-code",
  });

  return (
    <div
      className="flex justify-center items-center min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat p-4"
      style={{
        backgroundImage:
          "url('/src/assets/imageProject/vecteezy_abstract-orange-wavy-background-orange-background-with_35768911.jpg')",
      }}
    >
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-center mb-3">
          <img
            src="/src/assets/imageProject/logo.jpg"
            alt="Logo"
            className="w-11 rounded-full"
          />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
          Sign Up
        </h2>
        <p className="text-gray-600 text-center mb-2">
          Already have an account?{" "}
          <a href="/" className="text-orange-600 hover:underline">
            Log in
          </a>
        </p>

        <button
          className="flex items-center justify-center w-80 ml-4 text-gray-800 py-2 rounded-lg border mb-4 hover:bg-red-500 transition"
          onClick={googleLogin}
        >
          <FcGoogle size={20} className="mr-2" />
          Log in with Google
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
      <ToasterHot/>
    </div>
  );
}

export default SignUpPage;

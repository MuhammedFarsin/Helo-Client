import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axiosInstance, { googleAuth } from "../../Axios/axios";
import { useDispatch } from "react-redux";
import { login } from "../../Store/Slices/authSlice";
import { setUser } from "../../Store/Slices/userSlice";
import { toast } from "sonner";
import { useGoogleLogin } from "@react-oauth/google";
import { validateForm } from "../../Utils/AuthValidationForm/loginValdation";
import ToasterHot from "../Common/ToasterHot";

function SigninPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { username, password };

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
      const response = await axiosInstance.post("/login", {
        username,
        password,
      });

      if (response.status === 200 && response.data.token) {
        window.localStorage.setItem("accessToken", response.data.token);
        if (response.data.message) {
          toast.success(response.data.message);
        }
        setTimeout(() => {
          dispatch(login());
          dispatch(setUser(response.data.user));
        }, 500);
        console.log(setUser(response.data.user));
      } else if (response.status === 403) {
        toast.error(response.data.message);
      } else if (response.status === 401) {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error(error.response.data.message);
      } else if (error.response && error.response.status === 404) {
        toast.error(error.response.data.message);
      } else {
        console.error("Login error:", error);
        toast.error("An error occurred during login. Please try again.");
      }
    }
  };

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const response = await googleAuth(authResult["code"]);

        localStorage.setItem("accessToken", response.data.token);
        dispatch(login());
        dispatch(setUser(response.data.user));
        console.log(response.data.user);
        toast.success("Login successful!");
      } else {
        toast.error("No authorization code received");
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      toast.error("Login failed");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: (error) => {
      toast.error("Google login failed.", error);
    },
    flow: "auth-code",
  });

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('/src/assets/imageProject/vecteezy_abstract-orange-wavy-background-orange-background-with_35768911.jpg')",
      }}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full"
        style={{ fontFamily: "Roboto, sans-serif" }}
      >
        <div className="flex justify-center mb-6">
          <img
            src="/src/assets/imageProject/logo.jpg"
            alt="Logo"
            className="w-12 rounded-full"
          />
        </div>
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Log in
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-orange-500">
            Sign up
          </a>
        </p>

        <button
          className="flex items-center justify-center w-full text-gray-800 py-2 rounded-lg border mb-4 hover:bg-red-500 transition"
          onClick={googleLogin}
        >
          <FcGoogle size={20} className="mr-2" />
          Log in with Google
        </button>

        <div className="flex items-center mb-4">
          <span className="flex-1 h-px bg-gray-300"></span>
          <span className="px-4 text-gray-500">OR</span>
          <span className="flex-1 h-px bg-gray-300"></span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your Username"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              style={{ fontFamily: "Roboto, sans-serif" }}
            />
          </div>
          <div className="mb-4 relative">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              style={{ fontFamily: "Roboto, sans-serif" }}
            />
          </div>
          <div className="text-right mb-4">
            <a href="/email-password-reset" className="text-orange-500 text-sm">
              Forgot your password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Log in
          </button>
        </form>
      </div>
      <ToasterHot />
    </div>
  );
}

export default SigninPage;

import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axiosInstance from "../../../Axios/axios";
import localStorage from "redux-persist/lib/storage";
import { useDispatch } from "react-redux";
import { login } from "../../../Redux/Slices/authSlice";
import { setUser } from "../../../Redux/Slices/userSlice";
import { toast } from "react-toastify";
import * as jwt_decode from "jwt-decode";


function SigninPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axiosInstance.post("/login", {
        username,
        password,
      });

      console.log(response);

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("accessToken", response.data.token);
        dispatch(login());
        dispatch(setUser(response.data.user));
        toast.success("Login successful!");
      } else {
        setError("Invalid username or password. Please try again.");
        toast.error("Invalid Password or Username...!");
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.");
      console.error("Login error:", error);
    }
  };

  const handleGoogleLogin = () => {
    window.open("http://localhost:4000/auth/google", "_self");
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");  // Extract token from the URL
    console.log(token)
    console.log(urlParams)
    if (token) {
      localStorage.setItem("accessToken", token);  // Store the token in local storage
      
      try {
        // Decode the JWT token
        const decodedToken = jwt_decode(token);
        console.log("Decoded Token:", decodedToken);
        
        if (decodedToken && decodedToken.id && decodedToken.email) {
          // Dispatch user data to the store
          dispatch(
            setUser({
              id: decodedToken.id,
              email: decodedToken.email,
              name: decodedToken.name || "User",  // If name is missing, fallback to "User"
            })
          );
          dispatch(login());  // Mark user as logged in
          toast.success("Google login successful!");
        } else {
          toast.error("Invalid token data.");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        toast.error("Failed to decode token.");
      }
    }
  }, [dispatch]);

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

        {/* Google Login Button */}
        <button
          className="flex items-center justify-center w-full text-gray-800 py-2 rounded-lg border mb-4 hover:bg-red-500 transition"
          onClick={handleGoogleLogin}
        >
          <FcGoogle size={20} className="mr-2" />
          Log in with Google
        </button>

        <div className="flex items-center mb-4">
          <span className="flex-1 h-px bg-gray-300"></span>
          <span className="px-4 text-gray-500">OR</span>
          <span className="flex-1 h-px bg-gray-300"></span>
        </div>

        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

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
    </div>
  );
}

export default SigninPage;

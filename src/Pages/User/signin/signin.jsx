import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axiosInstance from "../../../Axios/axios"; // Import axios instance
import localStorage from "redux-persist/lib/storage";
import { useDispatch } from "react-redux";
import { login } from "../../../Redux/Slices/authSlice";
import { setUser } from "../../../Redux/Slices/userSlice";
import { toast } from "react-toastify";
import "./signin.css";

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

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <img src="/src/assets/imageProject/logo.jpg" alt="Logo" />
        </div>
        <h2>Log in</h2>
        <p>
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>

        {/* Google Login Button */}
        <button className="social-login google">
          <FcGoogle size={20} style={{ marginRight: "10px" }} />
          Log in with Google
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        {error && <p className="error">{error}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your Username"
              required
              className="login-input"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              required
              className="login-input"
            />
          </div>
          <div className="forgot-password">
            <a href="/forgot-password">Forgot your password?</a>
          </div>
          <button type="submit" className="login-button">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default SigninPage;

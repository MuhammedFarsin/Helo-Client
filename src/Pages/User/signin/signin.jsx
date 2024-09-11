import { FcGoogle } from 'react-icons/fc';
// import axiosInstance from "../../../Axios/axios";
import "./signin.css"

function SigninPage() {
    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo">
                    <img src="/src/assets/imageProject/logo.jpg" alt="Logo" />
                </div>
                <h2>Log in</h2>
                <p>Donot have an account? <a href="/signup">Sign up</a></p>
                
                {/* Google Login Button */}
                <button className="social-login google">
                    <FcGoogle size={20} style={{ marginRight: '10px' }} />
                    Log in with Google
                </button>
                
                <div className="divider">
                    <span>OR</span>
                </div>
                
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Your email</label>
                        <input type="email" id="email" placeholder="Your email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Your password</label>
                        <input type="password" id="password" placeholder="Your password" required />
                        <span className="toggle-password">Hide</span>
                    </div>
                    <div className="forgot-password">
                        <a href="#">Forgot your password?</a>
                    </div>
                    <button className="login-button">Log in</button>
                </form>
            </div>
        </div>
    );
}

export default SigninPage;

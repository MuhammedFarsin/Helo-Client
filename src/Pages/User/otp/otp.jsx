import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import axiosInstance from "../../../Axios/axios";
import "./otp.css";

function OtpPage() {
    const inputsRef = useRef([]);
    const [otp, setOtp] = useState(""); // State to hold OTP value
    const [error, setError] = useState(""); // State to handle error messages
    const navigate = useNavigate(); // Hook to navigate to other pages

    const handleChange = (e, index) => {
        let value = e.target.value;
        if (value.length > 0 && index < inputsRef.current.length - 1) {
            inputsRef.current[index + 1].focus();
        }

        const updatedOtp = inputsRef.current.map(input => input.value).join('');
        setOtp(updatedOtp); // Update OTP state
    };

    const handleBackspace = (e, index) => {
        if (e.key === "Backspace" && index > 0 && e.target.value.length === 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await axiosInstance.post("/verify-otp", { otp });
            if (response.data.success) {
                navigate("/home"); // Navigate to the home page on success
            } else {
                setError("Invalid OTP. Please try again.");
            }
        } catch (error) {
            setError("An error occurred while verifying OTP.",error);
        }
    };

    return (
        <div className="otp-container">
            <h2>Enter your OTP</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="otp-inputs">
                {Array(4).fill().map((_, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength="1"
                        ref={(el) => (inputsRef.current[index] = el)}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleBackspace(e, index)}
                    />
                ))}
            </div>
            <button className="confirm-otp" onClick={handleSubmit}>Confirm OTP</button>
            <a href="/resend-otp" className="resend-otp">Resend OTP</a>
        </div>
    );
}

export default OtpPage;

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../Axios/axios";

function OtpPage() {
  const inputsRef = useRef([]);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e, index) => {
    let value = e.target.value;
    if (value.length > 0 && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }

    const updatedOtp = inputsRef.current.map((input) => input.value).join("");
    setOtp(updatedOtp);
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && index > 0 && e.target.value.length === 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post("/verify-otp", {
        otp: otp.trim(),
      });
      if (response.data.message) {
        console.log("OTP verified successfully, navigating to login");
        navigate("/login");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("An error occurred while verifying OTP.");
    }
  };

return (
    <div className="flex justify-center items-center min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat p-4" style={{ backgroundImage: "url('/src/assets/imageProject/vecteezy_abstract-orange-wavy-background-orange-background-with_35768911.jpg')" }}>
      <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
        <h2 className="text-2xl font-semibold mb-4">Enter your OTP</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex justify-between mb-6">
          {Array(4)
            .fill()
            .map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                className="w-10 h-10 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
            ))}
        </div>
        <button
          className="w-full py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-colors"
          onClick={handleSubmit}
        >
          Confirm OTP
        </button>
        <a
          href="/resend-otp"
          className="block text-gray-500 mt-4 hover:underline"
        >
          Resend OTP
        </a>
      </div>
    </div>
  );
}

export default OtpPage;

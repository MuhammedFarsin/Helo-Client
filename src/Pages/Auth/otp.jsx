import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Axios/axios";
import { toast } from "sonner";
import Timer from "../Common/TimeStamp";
import ToasterHot from "../Common/ToasterHot";

function OtpPage() {
  const inputsRef = useRef([]);
  const [otp, setOtp] = useState("");
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const duration = 60;

  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, []);

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
    if (otp.length !== 4) {
      toast.error("Please enter a 4-digit OTP");
      return;
    }

    const email = localStorage.getItem("email");
    if (!email) {
      toast.error("User not found...!");
      return;
    }

    try {
      const response = await axiosInstance.post("/verify-otp", {
        email,
        otp: otp.trim(),
      });

      if (response.status === 201) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/");
        }, 500);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        toast.error(err.response.data.message);
      } else if (err.response.status === 409) {
        toast.error(err.response.data.message);
      } else if (err.response.status === 500) {
        toast.error("Error verifying OTP. Please try again.");
      } else {
        toast.error("An error occurred while verifying OTP.");
      }
    }
  };

  const handleTimerExpire = () => {
    toast.error("OTP has expired. Please request a new one.");
  };

  const resendOtp = async () => {
    const email = localStorage.getItem("email");
    if (!email) {
      toast.error("User not found...!");
      return;
    }

    try {
      setIsResending(true);
      const response = await axiosInstance.post("/resend-otp", { email });
      toast.success(response.data.message);

      setTimeout(() => {
        setIsResending(false);
      }, 30000); // Disable resending for 30 seconds to prevent spam
    } catch (error) {
      toast.error("Error while resending OTP.", error);
      setIsResending(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat p-4"
      style={{
        backgroundImage:
          "url('/src/assets/imageProject/vecteezy_abstract-orange-wavy-background-orange-background-with_35768911.jpg')",
      }}
    >
      <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
        <h2 className="text-2xl font-semibold mb-4">Enter your OTP</h2>
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
        <div className="flex justify-start mt-4">
          <Timer duration={duration} onExpire={handleTimerExpire} />
        </div>
        <button
          onClick={resendOtp}
          disabled={isResending}
          className={`block text-gray-500 mt-4 hover:underline ${
            isResending ? "bg-gray-400" : "bg-transparent"
          }`}
        >
          {isResending ? "Resending..." : "Resend OTP"}
        </button>
        <ToasterHot />
      </div>
    </div>
  );
}

export default OtpPage;

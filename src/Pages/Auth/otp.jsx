import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Axios/axios";
import { toast } from "sonner";
import ToasterHot from "../Common/ToasterHot";
import Timer from "../Common/TimeStamp"

function OtpPage() {
  const inputsRef = useRef([]);
  const [otp, setOtp] = useState("");
  const [timerExpired, setTimerExpired] = useState(false); // State to track if the timer has expired

  const navigate = useNavigate();
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
    
      console.log(response);
    
      if (response.data.message) {
        console.log("OTP verified successfully, navigating to login");
        toast.success(response.data.message);
    
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Error while Verify otp",error);
    }
  };

  const handleTimerExpire = () => {
    setTimerExpired(true);
    toast.error("Time expired. Please request a new OTP.");
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
          disabled={timerExpired} // Disable the button if the timer has expired
        >
          Confirm OTP
        </button>
        <br/>
        <br/>
        <Timer duration={30} onExpire={handleTimerExpire} />
        <a
          href="/resend-otp"
          className="block text-gray-500 mt-4 hover:underline"
        >
          Resend OTP
        </a>
      </div>
      <ToasterHot />
    </div>
  );
}

export default OtpPage;

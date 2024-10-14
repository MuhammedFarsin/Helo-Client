import { useState } from "react";
import axiosInstance from "../../Axios/axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ToasterHot from "../Common/ToasterHot";

function ResetPasswordPage() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/verify-email-resetPassword", {
        email,
      });

      if (response.status === 200) {
        console.log(response.data)
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/reset-password-otp");
        }, 500);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Error sending OTP. Please try again.");
      }
      console.error("Error sending OTP:", err);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('/src/assets/imageProject/vecteezy_abstract-orange-wavy-background-orange-background-with_35768911.jpg')",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-96 max-w-full">
       
          <>
            <h2 className="text-2xl font-semibold mb-4">Reset Your Password</h2>
            <p className="text-gray-600 mb-6">
              To request a new password, enter your email
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm mb-2"
              >
                Enter your email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
              <button
                type="submit"
                className="w-full py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-colors"
              >
                Continue
              </button>
            </form>
            <div className="flex justify-center">
              <Link
                to="/"
                className="block text-center w-16 py-2 mt-4 bg-orange-400 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Back
              </Link>
            </div>
            <ToasterHot />
          </>
        
        
      </div>
    </div>
  );
}

export default ResetPasswordPage;

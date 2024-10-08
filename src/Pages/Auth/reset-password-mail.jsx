import { useState } from "react";
import axiosInstance from "../../../Axios/axios";
import { useNavigate } from "react-router-dom";

function ResetPasswordPage() {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState(""); // State to hold email input
  const [error, setError] = useState(""); // State to handle errors

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/verify-email-resetPassword", { email });
      if (response.status === 200) {
        setEmailSent(true);
        navigate('/reset-password-otp')
      }
    } catch (err) {
      setError("Failed to send OTP. Please check your email and try again."); // Handle error
      console.error("Error sending OTP:", err);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/src/assets/imageProject/vecteezy_abstract-orange-wavy-background-orange-background-with_35768911.jpg')",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-96 max-w-full">
        {!emailSent ? (
          <>
            <h2 className="text-2xl font-semibold mb-4">Reset Your Password</h2>
            <p className="text-gray-600 mb-6">To request a new password, enter your email</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <label htmlFor="email" className="block text-gray-700 text-sm mb-2">
                Enter your email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your email address"
                value={email} // Bind input value to state
                onChange={(e) => setEmail(e.target.value)} // Update state on input change
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
              <button
                type="submit"
                className="w-full py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-colors"
              >
                Continue
              </button>
              {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error message */}
            </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Check Your Email</h2>
            <p className="text-gray-600">
              We have sent you an email with instructions to reset your password.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResetPasswordPage;
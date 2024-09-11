import { useState } from "react";
import "./reset-password-mail.css";

function ResetPasswordPage() {
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailSent(true);
  };

  return (
    <div className="reset-password-container">
      {!emailSent ? (
        <>
          <h2>Reset Your Password</h2>
          <p>To request a new password, enter your email</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Enter your email</label>
            <input
              type="email"
              id="email"
              placeholder="Your email address"
              required
            />
            <button type="submit">Continue</button>
          </form>
        </>
      ) : (
        <div className="confirmation-message">
          <h2>Check Your Email</h2>
          <p>
            We have sent you an email with instructions to reset your password.
          </p>
        </div>
      )}
    </div>
  );
}

export default ResetPasswordPage;

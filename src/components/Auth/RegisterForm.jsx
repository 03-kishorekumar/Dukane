import { useState } from "react";

const RegisterForm = () => {
  const [role, setRole] = useState("employer");

  return (
    <>
      <p className="register-as">Register as</p>

      <div className="role-selector">
        <div
          className={`role-box ${role === "employer" ? "selected" : ""}`}
          onClick={() => setRole("employer")}
        >
          🏢
          <span>Employer</span>
        </div>

        <div
          className={`role-box ${role === "applicant" ? "selected" : ""}`}
          onClick={() => setRole("applicant")}
        >
          👤
          <span>Applicant</span>
        </div>
      </div>

      <form className="auth-form">
        <label>Name*</label>
        <input type="text" placeholder="Enter your name" />

        <label>Email*</label>
        <input type="email" placeholder="Enter your email" />

        <label>Phone Number*</label>
        <input type="tel" placeholder="Enter your phone number" />

        <button type="submit" className="otp-btn">
          Send OTP
        </button>
      </form>
    </>
  );
};

export default RegisterForm;

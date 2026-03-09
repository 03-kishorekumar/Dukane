import { useState } from "react";
import useRegister from "../../hooks/userRegister.js";

/* ── Icons (unchanged) ────────────────────────────────────────── */
const EmployerIcon = () => (
  <svg className="role-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="16" />
    <line x1="10" y1="14" x2="14" y2="14" />
  </svg>
);

const ApplicantIcon = () => (
  <svg className="role-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const UserIcon = () => (
  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MailIcon = () => (
  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 9.81a19.79 19.79 0 0 1-3.07-8.66A2 2 0 0 1 3 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 10.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17z" />
  </svg>
);
/* ── End Icons ────────────────────────────────────────────────── */

const RegisterForm = () => {
  // ── UI state (unchanged) ──────────────────────────────────────
  const [role, setRole] = useState("applicant");

  // ── Form field state (NEW — was plain uncontrolled inputs) ────
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // ── API hook (NEW) ────────────────────────────────────────────
  const { handleRegister, loading, error } = useRegister();

  const onSubmit = async () => {
    const result = await handleRegister({ fullName, email, phoneNumber, role });
    if (result.success) {
      // TODO: navigate to OTP verification screen
      alert("OTP sent to " + email);
    }
  };

  return (
    <>
      {/* ── Role selector (UI unchanged) ──────────────────────── */}
      <p className="register-as">Register as</p>

      <div className="role-selector">
        <div
          className={`role-box ${role === "employer" ? "selected" : ""}`}
          onClick={() => setRole("employer")}
        >
          <EmployerIcon />
          <span>Employer</span>
        </div>

        <div
          className={`role-box ${role === "applicant" ? "selected" : ""}`}
          onClick={() => setRole("applicant")}
        >
          <ApplicantIcon />
          <span>Applicant</span>
        </div>
      </div>

      {/* ── Form (UI unchanged, inputs now controlled) ──────────── */}
      <div className="auth-form">
        <div className="form-group">
          <label>Name<span className="required">*</span></label>
          <div className="input-wrapper">
            <UserIcon />
            <input
              type="text"
              placeholder="Enter your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Email<span className="required">*</span></label>
          <div className="input-wrapper">
            <MailIcon />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Phone Number<span className="required">*</span></label>
          <div className="input-wrapper">
            <PhoneIcon />
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>

        {/* Error message (NEW — shown only on API failure) */}
        {error && <p className="error-text">{error}</p>}

        <button
          type="button"
          className="otp-btn"
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </div>
    </>
  );
};

export default RegisterForm;




// import { useState } from "react";

// /* Inline SVG icons — no extra library needed */
// const EmployerIcon = () => (
//   <svg className="role-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//     <rect x="2" y="7" width="20" height="14" rx="2" />
//     <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
//     <line x1="12" y1="12" x2="12" y2="16" />
//     <line x1="10" y1="14" x2="14" y2="14" />
//   </svg>
// );

// const ApplicantIcon = () => (
//   <svg className="role-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
//     <circle cx="12" cy="7" r="4" />
//   </svg>
// );

// const UserIcon = () => (
//   <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
//     <circle cx="12" cy="7" r="4" />
//   </svg>
// );

// const MailIcon = () => (
//   <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//     <rect x="2" y="4" width="20" height="16" rx="2" />
//     <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
//   </svg>
// );

// const PhoneIcon = () => (
//   <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 9.81a19.79 19.79 0 0 1-3.07-8.66A2 2 0 0 1 3 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 10.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17z" />
//   </svg>
// );

// const RegisterForm = () => {
//   const [role, setRole] = useState("applicant");

//   return (
//     <>
//       <p className="register-as">Register as</p>

//       <div className="role-selector">
//         <div
//           className={`role-box ${role === "employer" ? "selected" : ""}`}
//           onClick={() => setRole("employer")}
//         >
//           <EmployerIcon />
//           <span>Employer</span>
//         </div>

//         <div
//           className={`role-box ${role === "applicant" ? "selected" : ""}`}
//           onClick={() => setRole("applicant")}
//         >
//           <ApplicantIcon />
//           <span>Applicant</span>
//         </div>
//       </div>

//       <div className="auth-form">
//         <div className="form-group">
//           <label>Name<span className="required">*</span></label>
//           <div className="input-wrapper">
//             <UserIcon />
//             <input type="text" placeholder="Enter your name" />
//           </div>
//         </div>

//         <div className="form-group">
//           <label>Email<span className="required">*</span></label>
//           <div className="input-wrapper">
//             <MailIcon />
//             <input type="email" placeholder="Enter your email" />
//           </div>
//         </div>

//         <div className="form-group">
//           <label>Phone Number<span className="required">*</span></label>
//           <div className="input-wrapper">
//             <PhoneIcon />
//             <input type="tel" placeholder="Enter your phone number" />
//           </div>
//         </div>

//         <button type="button" className="otp-btn">
//           Send OTP
//         </button>
//       </div>
//     </>
//   );
// };

// export default RegisterForm;
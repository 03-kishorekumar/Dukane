const MailIcon = () => (
  <svg
    className="input-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const SignInForm = () => {
  return (
    <div className="auth-form">
      <div className="form-group">
        <label>
          Phone Number or Email<span className="required">*</span>
        </label>
        <div className="input-wrapper">
          <MailIcon />
          <input type="text" placeholder="Enter phone number or email" />
        </div>
      </div>

      <button type="button" className="otp-btn">
        Continue with Sign In
      </button>
    </div>
  );
};

export default SignInForm;
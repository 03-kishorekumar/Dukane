import AuthTabs from "./AuthTabs";
import RegisterForm from "./RegisterForm";

const AuthCard = () => {
  return (
    <div className="auth-card">
      <h2 className="brand-title">Welcome</h2>
      <p className="brand-subtitle">Create your account</p>

      <AuthTabs />

      <RegisterForm />

      <p className="terms-text">
        By continuing, you agree to our{" "}
        <span>Terms of Service</span> and <span>Privacy Policy</span>
      </p>
    </div>
  );
};

export default AuthCard;

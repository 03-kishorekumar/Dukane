import { useState } from "react";
import AuthCard from "../components/Auth/AuthCard";
import "../styles/auth.css";
import dukaneLogo from "../assets/Gemini_Generated_Image_o0b71bo0b71bo0b7.png";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("signin");

  return (
    <div className="auth-container">
      <div className="brand-header">
<img src={dukaneLogo} alt="Dukane" className="brand-logo" />
        <h2 className="brand-title">Welcome</h2>
        <p className="brand-subtitle">
          {activeTab === "signin"
            ? "Sign in to your account"
            : "Create your account"}
        </p>
      </div>

      <AuthCard activeTab={activeTab} setActiveTab={setActiveTab} />

      <p className="terms-text">
        By continuing, you agree to our{" "}
        <span className="link">Terms of Service</span> and{" "}
        <span className="link">Privacy Policy</span>
      </p>
    </div>
  );
};

export default AuthPage;
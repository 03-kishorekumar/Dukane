import AuthTabs from "./AuthTabs";
import RegisterForm from "./RegisterForm";
import SignInForm from "./SigninForm";

const AuthCard = ({ activeTab, setActiveTab }) => {
  return (
    <div className="auth-card">
      <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "signin" ? <SignInForm /> : <RegisterForm />}
    </div>
  );
};

export default AuthCard;
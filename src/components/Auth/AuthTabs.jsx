const AuthTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="auth-tabs">
      <button
        className={`tab ${activeTab === "signin" ? "active" : "inactive"}`}
        onClick={() => setActiveTab("signin")}
      >
        Sign In
      </button>
      <button
        className={`tab ${activeTab === "register" ? "active" : "inactive"}`}
        onClick={() => setActiveTab("register")}
      >
        Register
      </button>
    </div>
  );
};

export default AuthTabs;
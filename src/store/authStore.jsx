import { createContext, useContext, useState } from "react";

const AuthStoreContext = createContext(null);

export const AuthStoreProvider = ({ children }) => {
  // Holds the registration token returned by the backend after OTP is sent
  const [registrationToken, setRegistrationToken] = useState(null);

  // The email used during registration — needed for OTP verify screen
  const [pendingEmail, setPendingEmail] = useState(null);

  // "employee" | "admin"
  const [registeredRole, setRegisteredRole] = useState(null);

  const setRegistrationData = ({ token, email, role }) => {
    setRegistrationToken(token);
    setPendingEmail(email);
    setRegisteredRole(role);
  };

  const clearRegistration = () => {
    setRegistrationToken(null);
    setPendingEmail(null);
    setRegisteredRole(null);
  };

  return (
    <AuthStoreContext.Provider
      value={{
        registrationToken,
        pendingEmail,
        registeredRole,
        setRegistrationData,
        clearRegistration,
      }}
    >
      {children}
    </AuthStoreContext.Provider>
  );
};

export const useAuthStore = () => useContext(AuthStoreContext);
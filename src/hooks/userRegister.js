import { useState } from "react";
import { registerEmployee, registerAdmin } from "../services/authService";
import { useAuthStore } from "../store/authStore";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setRegistrationData } = useAuthStore();

  // role: "applicant" maps to employee endpoint
  //       "employer"  maps to admin endpoint
  const handleRegister = async ({ fullName, email, phoneNumber, role }) => {
    setLoading(true);
    setError(null);

    try {
      const payload = { fullName, email, phoneNumber };

      const res =
        role === "employer"
          ? await registerAdmin(payload)
          : await registerEmployee(payload);

      // Backend returns: { token: "..." }
      setRegistrationData({
        token: res.data.token,
        email,
        role,
      });

      return { success: true };
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data ||
        "Registration failed. Please try again.";
      setError(message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, loading, error };
};

export default useRegister;
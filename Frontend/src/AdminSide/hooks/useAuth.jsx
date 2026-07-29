import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, passcode }) => {
    setLoading(true);

    try {
      console.log(email, passcode);
      const data = await login({ email, passcode });

      if (data?.user) {
        setUser(data.user);
        return { success: true };
      }

      return { success: false, message: "Login failed" };
    } catch (err) {
      console.log(err);
      const message =
        err.response?.data?.message ||
        err.message ||
        "Invalid email or password";
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, handleLogin };
};

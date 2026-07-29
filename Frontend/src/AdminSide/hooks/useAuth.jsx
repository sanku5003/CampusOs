import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register , logout , getProfile } from "../services/auth.api";

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

  const handleRegister = async (schoolData) => {
    setLoading(true);
    try {
      const data = await register(schoolData);
      if (data?.user) {
        setUser(data.user);
        return { success: true, user: data.user };
      }

      return {
        success: false,
        message: data?.message || "Registration failed",
      };
    } catch (err) {
      console.log(err);
      const message =
        err.response?.data?.message || err.message || "Registration failed";
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    const data = await logout();
    setUser(null);
    setLoading(false);
  };

  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        const data = await getProfile();

        console.log("getMe response:", data);
        if (data) {
          setUser(data.user);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getAndSetUser();
  }, []);

  return { user, loading, handleLogin, handleRegister, handleLogout };
};

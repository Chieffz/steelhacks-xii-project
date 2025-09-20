import { useState, useEffect } from "react";
import "../style/Login.css";
import { login, register, logout } from "../firebase/FirebaseServices.js";
import { auth } from "../firebase/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import Cookies from "js-cookie";

/* ---- Map Firebase errors to friendly messages ---- */
function mapAuthError(err) {
  const code = err?.code || "";

  if (
    code === "auth/invalid-credential" ||
    code === "auth/invalid-login-credentials" ||
    code === "auth/wrong-password" ||
    code === "auth/user-not-found"
  ) {
    return "Email or password is incorrect.";
  }

  switch (code) {
    case "auth/invalid-email":
      return "That email doesn’t look right. Please check and try again.";
    case "auth/user-disabled":
      return "This account has been disabled. Contact support.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    case "auth/email-already-in-use":
      return "There’s already an account with that email.";
    case "auth/weak-password":
      return "Please use a stronger password.";
    default:
      return err?.message || "Something went wrong. Please try again.";
  }
}

/* ---- Snackbar ---- */
function Snackbar({ snack, onClose }) {
  useEffect(() => {
    if (!snack) return;
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [snack, onClose]);

  if (!snack) return null;

  const { message, variant = "info" } = snack;

  return (
    <div
      className={`snackbar snackbar--${variant}`}
      role="status"
      aria-live="polite"
    >
      <span>{message}</span>
      <button className="snackbar-close" onClick={onClose} aria-label="Dismiss">
        ×
      </button>
    </div>
  );
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [snack, setSnack] = useState(null);
  const showSnack = (message, variant = "info") =>
    setSnack({ message, variant, id: Date.now() });
  const hideSnack = () => setSnack(null);

  // Track login state + token in cookie
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const token = await currentUser.getIdToken();
        Cookies.set("idToken", token, { secure: true, sameSite: "strict" }); // 🔑 save in cookie
        showSnack(`Signed in as ${currentUser.email}`, "success");
      } else {
        Cookies.remove("idToken");
      }
    });
    return unsubscribe;
  }, []);

  const validateInputs = () => {
    if (!email.trim()) {
      showSnack("Please enter your email.", "error");
      return false;
    }
    if (!password) {
      showSnack("Please enter your password.", "error");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateInputs() || loading) return;
    setLoading(true);
    try {
      const res = await login(email, password);
      const token = await res.user.getIdToken();
      Cookies.set("idToken", token, { secure: true, sameSite: "strict" }); // 🔑 save cookie
      showSnack(`Welcome back, ${res.user.email}`, "success");
    } catch (err) {
      showSnack(mapAuthError(err), "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await logout();
      Cookies.remove("idToken"); // 🔑 clear cookie
      showSnack("You have been signed out.", "success");
    } catch (err) {
      showSnack(mapAuthError(err), "error");
    } finally {
      setLoading(false);
    }
  };

  // Example: API submit using token from cookie
  const handleSubmit = async () => {
    const token = Cookies.get("idToken"); // 🔑 read cookie
    if (!token) {
      showSnack("You are not authenticated.", "error");
      return;
    }

    try {
      const payload = { example: "data" };
      const res = await fetch("https://your-api.com/endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("API response:", data);
      showSnack("Data submitted successfully!", "success");
    } catch (err) {
      showSnack("Failed to submit data.", "error");
    }
  };

  return (
    <LoginBackground>
      <div className="login-box">
        {user ? (
          <>
            <h2 className="login-title">Welcome, {user.email}</h2>
            <button
              onClick={handleLogout}
              className="login-button"
              disabled={loading}
              aria-busy={loading ? "true" : "false"}
            >
              {loading ? "Signing out..." : "Logout"}
            </button>

            {/* Example submit button */}
            <button onClick={handleSubmit} className="login-button">
              Submit to API
            </button>
          </>
        ) : (
          <>
            <h2 className="login-title">Sign In</h2>
            <form className="login-form" onSubmit={handleLogin} noValidate>
              <LoginContainer
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <LoginContainer
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="submit"
                className="login-button"
                disabled={loading}
                aria-busy={loading ? "true" : "false"}
              >
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>
          </>
        )}
      </div>

      <Snackbar snack={snack} onClose={hideSnack} />
    </LoginBackground>
  );
}

/* Background wrapper */
export function LoginBackground({ children }) {
  return <div className="login-wrapper">{children}</div>;
}

/* Reusable form field */
export function LoginContainer({
  label,
  placeholder,
  type,
  value,
  onChange,
  autoComplete,
}) {
  const inputType =
    type || (label.toLowerCase() === "password" ? "password" : "text");

  return (
    <div className="login-container">
      <label className="field-label">
        {label}
        <input
          type={inputType}
          placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required
        />
      </label>
    </div>
  );
}

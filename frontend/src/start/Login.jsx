import { useState, useEffect } from "react";
import "../style/Login.css";
import { login, register, logout } from "../firebase/FirebaseServices.js"; 
import { auth } from "../firebase/firebase.js"; 
import { onAuthStateChanged } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // Track login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("✅ Auth state changed: User signed in:", currentUser);
      } else {
        console.log("ℹ️ Auth state changed: No user signed in");
      }
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      console.log("✅ Login success:", res.user);
    } catch (err) {
      console.error("❌ Login failed:", err.message);
    }
  };

  const handleRegister = async () => {
    try {
      const res = await register(email, password);
      console.log("✅ Registration success:", res.user);
    } catch (err) {
      console.error("❌ Registration failed:", err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      console.log("✅ User logged out");
    } catch (err) {
      console.error("❌ Logout failed:", err.message);
    }
  };

  return (
    <LoginBackground>
      <div className="login-box">
        {user ? (
          <>
            <h2 className="login-title">Welcome, {user.email}</h2>
            <button onClick={handleLogout} className="login-button">Logout</button>
          </>
        ) : (
          <>
            <h2 className="login-title">Sign In</h2>
            <form className="login-form" onSubmit={handleLogin}>
              <LoginContainer 
                label="Email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <LoginContainer 
                label="Password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <button type="submit" className="login-button">Login</button>
              {/* <button 
                type="button" 
                className="login-button" 
                onClick={handleRegister}
              >
                Register
              </button> */}
            </form>
          </>
        )}
      </div>
    </LoginBackground>
  );
}

// ✅ Background wrapper
export function LoginBackground({ children }) {
  return <div className="login-wrapper">{children}</div>;
}

// ✅ Reusable form field, simplified
export function LoginContainer({ label, placeholder, type, value, onChange }) {
  const inputType =
    type || (label.toLowerCase() === "password" ? "password" : "text");

  return (
    <div className="login-container">
      <label>
        {label}
        <input
          type={inputType}
          placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
}

import type { ReactNode } from "react";
import "../style/Login.css";

export default function Login() {
  return (
    <LoginBackground>
      <div className="login-box">
        <h2 className="login-title">Sign In</h2>
        <form className="login-form">
          <LoginContainer label="Username" />
          <LoginContainer label="Password" />
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </LoginBackground>
  );
}

export function LoginBackground({ children }: { children: ReactNode }) {
  return <div className="login-wrapper">{children}</div>;
}

export function LoginContainer({
  label,
  placeholder,
  type,
}: {
  label: string;
  placeholder?: string;
  type?: string;
}) {
  // if no type is passed in, fall back to "password" if label is Password, else "text"
  const inputType =
    type || (label.toLowerCase() === "password" ? "password" : "text");

  return (
    <div className="login-container">
      <label>
        {label}
        <input
          type={inputType}
          placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
        />
      </label>
    </div>
  );
}

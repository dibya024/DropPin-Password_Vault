import { useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import "../../CSS/Auth.css";
import "../../CSS/Login.css";
import { loginAccount } from "../api/auth";

import eye from "../images/eye.png";
import eyeCross from "../images/cross-eye.png";

const Login = ({ onLogin }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginNotice, setLoginNotice] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginNotice("");

    const formData = new FormData(event.currentTarget);
    const identifier = formData.get("identifier");
    const password = formData.get("password");

    try {
      const { user } = await loginAccount(identifier, password);
      onLogin(user);
      navigate("/home");
    } catch (error) {
      setLoginNotice(error.message);
    }
  };

  return (
    <div className="signup-page login-page">
      <div className="signup-orb signup-orb--cyan" aria-hidden="true" />
      <div className="signup-orb signup-orb--violet" aria-hidden="true" />

      <main className="signup-layout login-layout">
        <section
          className="signup-showcase login-showcase"
          aria-label="Welcome to DropPin"
        >
          <div className="login-showcase__eyebrow">
            <span className="login-showcase__eyebrow-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3 5 6v5c0 4.5 2.8 8.1 7 10 4.2-1.9 7-5.5 7-10V6l-7-3Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="m9 12 2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>DROP PIN</span>
          </div>

          <h1 className="login-showcase__title">
            Your vault,
            <br />
            <span className="login-showcase__title-accent">within reach.</span>
          </h1>
        </section>

        <section
          className="signup-card login-card"
          aria-labelledby="login-title"
        >
          <div className="signup-card__accent" />
          <div className="signup-card__heading">
            <div className="signup-card__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <rect
                  x="4"
                  y="10"
                  width="16"
                  height="11"
                  rx="2.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <p className="signup-card__kicker">YOUR PERSONAL VAULT</p>
              <h2 id="login-title">Welcome back</h2>
              <p className="signup-card__subtitle">
                Access your saved logins.
              </p>
            </div>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-field">
              <label htmlFor="login-identifier">Email or Username</label>
              <input
                id="login-identifier"
                name="identifier"
                type="text"
                placeholder="Email or username"
                autoComplete="username"
                required
              />
            </div>

            <div className="signup-field">
              <label htmlFor="login-password">Password</label>
              <div className="signup-input-wrap">
                <input
                  id="login-password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible((visible) => !visible)}
                  aria-label={`${passwordVisible ? "Hide" : "Show"} password`}
                  className="signup-password-toggle"
                >
                  <img src={passwordVisible ? eyeCross : eye} alt="" />
                </button>
              </div>
            </div>

            <div className="login-forgot-password">
              <button
                type="button"
                onClick={() =>
                  setLoginNotice("Password recovery is not available yet.")
                }
              >
                Forgot password?
              </button>
            </div>

            <button className="signup-submit" type="submit">
              <span>Sign in</span>
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M4 10h12m-5-5 5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {loginNotice && (
              <p className="login-notice" role="alert">
                {loginNotice}
              </p>
            )}
          </form>

          <p className="signup-card__login">
            New to DropPin? <Link to="/signup">Create an account</Link>
          </p>
        </section>
      </main>
    </div>
  );
};

export default Login;

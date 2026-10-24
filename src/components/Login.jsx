import { useState } from "react";
import { Link } from "react-router-dom";

import eye from "../images/eye.png";
import eyeCross from "../images/cross-eye.png";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginNotice, setLoginNotice] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoginNotice("Sign-in isn't connected yet. Please check back soon.");
  };

  return (
    <div className="signin-page">
      <div className="signin-orb signin-orb--cyan" aria-hidden="true" />
      <div className="signin-orb signin-orb--violet" aria-hidden="true" />

      <main className="signin-layout login-layout">
        <section
          className="signin-showcase login-showcase"
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
            <span>YOUR PERSONAL PASSWORD VAULT</span>
            <span className="login-showcase__eyebrow-line" aria-hidden="true" />
          </div>

          <h1 className="login-showcase__title">
            Everything safe.
            <br />
            <span>Everything</span>
            <br />
            <span className="login-showcase__title-accent">within reach.</span>
          </h1>
          <p className="login-showcase__description">
            Welcome back to a calmer way to manage your digital life.
          </p>

          <div className="login-vault-preview" aria-hidden="true">
            <div className="login-vault-preview__glow" aria-hidden="true" />
            <div className="login-vault-preview__top">
              <div className="login-vault-preview__brand">
                <span className="login-vault-preview__brand-icon">
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
                <span>
                  <strong>Your vault</strong>
                  <small>Private by design</small>
                </span>
              </div>
              <span className="login-vault-preview__secure">
                <span />
                SECURE
              </span>
            </div>

            <div className="login-vault-preview__divider" />

            <div className="login-vault-preview__account">
              <span className="login-vault-preview__service login-vault-preview__service--blue">
                G
              </span>
              <span className="login-vault-preview__account-info">
                <strong>Google account</strong>
                <small>Personal</small>
              </span>
              <span className="login-vault-preview__dots">
                ••••••••
              </span>
              <svg
                className="login-vault-preview__check"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="m5 10 3.2 3.2L15 6.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="login-vault-preview__account login-vault-preview__account--second">
              <span className="login-vault-preview__service login-vault-preview__service--violet">
                N
              </span>
              <span className="login-vault-preview__account-info">
                <strong>Netflix</strong>
                <small>Entertainment</small>
              </span>
              <span className="login-vault-preview__dots">
                ••••••••
              </span>
              <svg
                className="login-vault-preview__check"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="m5 10 3.2 3.2L15 6.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="login-showcase__trust">
            <span className="login-showcase__trust-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 2.5 4 5v4.2c0 3.8 2.4 6.8 6 8.3 3.6-1.5 6-4.5 6-8.3V5l-6-2.5Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <path
                  d="m7.5 9.8 1.7 1.7 3.4-3.6"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>
              <strong>A little peace of mind.</strong>
              <small>Your security always comes first.</small>
            </span>
            <span className="login-showcase__trust-sparkle" aria-hidden="true">
              ✦
            </span>
          </div>
        </section>

        <section className="signin-card login-card" aria-labelledby="login-title">
          <div className="signin-card__accent" />
          <div className="signin-card__heading">
            <div className="signin-card__icon" aria-hidden="true">
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
              <p className="signin-card__kicker">WELCOME BACK</p>
              <h2 id="login-title">Sign in to DropPin</h2>
              <p className="signin-card__subtitle">
                Enter your details to open your vault.
              </p>
            </div>
          </div>

          <form className="signin-form" onSubmit={handleSubmit}>
            <div className="signin-field">
              <label htmlFor="login-email">Email address</label>
              <input
                id="login-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="signin-field">
              <label htmlFor="login-password">Password</label>
              <div className="signin-input-wrap">
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
                  className="signin-password-toggle"
                >
                  <img src={passwordVisible ? eyeCross : eye} alt="" />
                </button>
              </div>
            </div>

            <label className="login-remember">
              <input type="checkbox" name="rememberMe" />
              <span>Remember me on this device</span>
            </label>

            <button className="signin-submit" type="submit">
              <span>Unlock my vault</span>
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
              <p className="login-notice" role="status">
                {loginNotice}
              </p>
            )}
          </form>

          <p className="signin-card__login">
            New to DropPin? <Link to="/signin">Create an account</Link>
          </p>
          <p className="signin-card__privacy">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M8 1.8 3 4v3.5c0 3.1 2 5.6 5 6.8 3-1.2 5-3.7 5-6.8V4L8 1.8Z"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="m6 7.8 1.4 1.4 2.8-3"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Your data stays yours. Always.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Login;

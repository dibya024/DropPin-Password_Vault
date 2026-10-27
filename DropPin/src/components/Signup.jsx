import { useState } from "react";

import "../../CSS/Signup.css";

import { useNavigate, Link } from "react-router-dom";
import { registeredAccount } from "../api/auth";

import eye from "../images/eye.png";
import eyeCross from "../images/cross-eye.png";

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [signupNotice, setsignupNotice] = useState("");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (event) => {
    const updatedForm = {
      ...form,
      [event.target.name]: event.target.value,
    };

    setForm(updatedForm);

    if (updatedForm.password && updatedForm.confirmPassword) {
      setPasswordError(
        updatedForm.password === updatedForm.confirmPassword
          ? ""
          : "Passwords do not match.",
      );
    } else {
      setPasswordError("");
    }
  };

  const passwordToggle = (label) => (
    <button
      type="button"
      onClick={() => setPasswordVisible((visible) => !visible)}
      aria-label={`${passwordVisible ? "Hide" : "Show"} ${label}`}
      className="signup-password-toggle"
    >
      <img src={passwordVisible ? eyeCross : eye} alt="" />
    </button>
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setsignupNotice("");

    if (form.password !== form.confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    try {
      await registeredAccount(form.email, form.username, form.password);
      navigate("/login");
    } catch (error) {
      setsignupNotice(error.message);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-orb signup-orb--cyan" aria-hidden="true" />
      <div className="signup-orb signup-orb--violet" aria-hidden="true" />

      <main className="signup-layout">
        <section className="signup-showcase" aria-label="About DropPin">
          <div className="signup-showcase__eyebrow">
            <span className="signup-showcase__status" />
            YOUR PERSONAL PASSWORD VAULT
          </div>

          <h1 className="signup-showcase__title">
            Your digital life,
            <br />
            <span>under lock</span>
            <span className="signup-showcase__period">.</span>
          </h1>
          <p className="signup-showcase__description">
            One calm, secure place for the passwords that keep your world
            moving.
          </p>

          <div className="signup-vault-card" aria-hidden="true">
            <div className="signup-vault-card__top">
              <span className="signup-vault-card__brand">
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
                DropPin vault
              </span>
              <span className="signup-vault-card__secure">ENCRYPTED</span>
            </div>
            <div className="signup-vault-card__item">
              <span className="signup-vault-card__icon">N</span>
              <span>
                <strong>Everyday accounts</strong>
                <small>Protected and ready</small>
              </span>
              <span className="signup-vault-card__dots">••••••</span>
            </div>
            <div className="signup-vault-card__item signup-vault-card__item--muted">
              <span className="signup-vault-card__icon">✦</span>
              <span>
                <strong>Peace of mind</strong>
                <small>All in one place</small>
              </span>
              <span className="signup-vault-card__check">✓</span>
            </div>
          </div>

          <p className="signup-showcase__footnote">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
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
            Built for a more secure everyday
          </p>
        </section>

        <section className="signup-card" aria-labelledby="signup-title">
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
              <p className="signup-card__kicker">GET STARTED</p>
              <h2 id="signup-title">Create your account</h2>
              <p className="signup-card__subtitle">
                Your passwords deserve a better home.
              </p>
            </div>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-field">
              <label htmlFor="signup-email">Email address</label>
              <input
                id="signup-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="signup-field">
              <label htmlFor="signup-username">Username</label>
              <input
                id="signup-username"
                name="username"
                type="text"
                placeholder="Set Username"
                autoComplete="nickname"
                maxLength={40}
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="signup-field">
              <label htmlFor="signup-password">Create password</label>
              <div className="signup-input-wrap">
                <input
                  id="signup-password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                {passwordToggle("password")}
              </div>
            </div>

            <div className="signup-field">
              <label htmlFor="signup-confirm-password">Confirm password</label>
              <div className="signup-input-wrap">
                <input
                  id="signup-confirm-password"
                  name="confirmPassword"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter it one more time"
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
                {passwordToggle("password")}
              </div>
              {passwordError && (
                <p className="mt-2 text-sm text-rose-400" role="alert">
                  {passwordError}
                </p>
              )}
            </div>

            <button className="signup-submit" type="submit">
              <span>Create account</span>
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
            {signupNotice && (
              <p className="mt-2 text-sm text-rose-400" role="alert">
                {signupNotice}
              </p>
            )}
          </form>

          <p className="signup-card__login">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
          <p className="signup-card__privacy">
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

export default Signup;

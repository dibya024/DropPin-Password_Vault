import { useState } from "react";

import eye from "../images/eye.png";
import eyeCross from "../images/cross-eye.png";

const Signin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const passwordToggle = (label) => (
    <button
      type="button"
      onClick={() => setPasswordVisible((visible) => !visible)}
      aria-label={`${passwordVisible ? "Hide" : "Show"} ${label}`}
      className="signin-password-toggle"
    >
      <img src={passwordVisible ? eyeCross : eye} alt="" />
    </button>
  );

  return (
    <div className="signin-page">
      <div className="signin-orb signin-orb--cyan" aria-hidden="true" />
      <div className="signin-orb signin-orb--violet" aria-hidden="true" />

      <main className="signin-layout">
        <section className="signin-showcase" aria-label="About DropPin">
          <div className="signin-showcase__eyebrow">
            <span className="signin-showcase__status" />
            YOUR PERSONAL PASSWORD VAULT
          </div>

          <h1 className="signin-showcase__title">
            Your digital life,
            <br />
            <span>under lock</span>
            <span className="signin-showcase__period">.</span>
          </h1>
          <p className="signin-showcase__description">
            One calm, secure place for the passwords that keep your world
            moving.
          </p>

          <div className="signin-vault-card" aria-hidden="true">
            <div className="signin-vault-card__top">
              <span className="signin-vault-card__brand">
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
              <span className="signin-vault-card__secure">ENCRYPTED</span>
            </div>
            <div className="signin-vault-card__item">
              <span className="signin-vault-card__icon">N</span>
              <span>
                <strong>Everyday accounts</strong>
                <small>Protected and ready</small>
              </span>
              <span className="signin-vault-card__dots">••••••</span>
            </div>
            <div className="signin-vault-card__item signin-vault-card__item--muted">
              <span className="signin-vault-card__icon">✦</span>
              <span>
                <strong>Peace of mind</strong>
                <small>All in one place</small>
              </span>
              <span className="signin-vault-card__check">✓</span>
            </div>
          </div>

          <p className="signin-showcase__footnote">
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

        <section className="signin-card" aria-labelledby="signin-title">
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
              <p className="signin-card__kicker">GET STARTED</p>
              <h2 id="signin-title">Create your account</h2>
              <p className="signin-card__subtitle">
                Your passwords deserve a better home.
              </p>
            </div>
          </div>

          <form className="signin-form">
            <div className="signin-field">
              <label htmlFor="signin-email">Email address</label>
              <input
                id="signin-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="signin-field">
              <label htmlFor="signin-password">Create password</label>
              <div className="signin-input-wrap">
                <input
                  id="signin-password"
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

            <div className="signin-field">
              <label htmlFor="signin-confirm-password">Confirm password</label>
              <div className="signin-input-wrap">
                <input
                  id="signin-confirm-password"
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
            </div>

            <button className="signin-submit" type="submit">
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
          </form>

          <p className="signin-card__login">
            Already have an account? <a href="/login">Log in</a>
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

export default Signin;

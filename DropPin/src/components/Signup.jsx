import { useState } from "react";

import "../../CSS/Auth.css";
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
    <div className="signup-page signup-page--simple">
      <div className="signup-orb signup-orb--cyan" aria-hidden="true" />
      <div className="signup-orb signup-orb--violet" aria-hidden="true" />

      <main className="signup-layout">
        <p className="signup-intro">
          Your passwords, all locked in. Nice and simple.
        </p>
        <section
          className="signup-card signup-card--simple"
          aria-labelledby="signup-title"
        >
          <div className="signup-card__accent" />
          <div className="signup-card__heading">
            <h2 id="signup-title">Create account</h2>
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
        </section>
      </main>
    </div>
  );
};

export default Signup;

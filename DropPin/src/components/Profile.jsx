import React from "react";

// import { logoutAccount } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  logoutAccount,
  requestEmailVerification,
  verifyEmailCode,
} from "../api/auth";

import "../../CSS/Profile.css";

const Profile = ({
  form,
  setform,
  currentUser,
  passwordArray,
  onUserUpdated,
  logoutPopupOpen,
  setLogoutPopupOpen,
  logoutError,
  setLogoutError,
  logoutPending,
  setLogoutPending,
  onLogout,
}) => {
  const navigate = useNavigate();

  const [otp, setotp] = useState("");
  const [otpSent, setotpSent] = useState(false);
  const [verificationLoading, setverificationLoading] = useState(false);
  const [verificationMessage, setverificationMessage] = useState("");
  const [verificationPopupOpen, setverificationPopupOpen] = useState(false);
  const [verificationError, setverificationError] = useState("");

  // const emailVerified = false;
  const emailVerified = currentUser?.emailVerified ?? false;

  const editUsername = (e, id) => {};

  const handleEmailVerification = async () => {
    setverificationLoading(true);
    setverificationError("");
    try {
      const result = await requestEmailVerification();
      setotpSent(true);
      setverificationMessage(result.message);
      setotp("");
    } catch (error) {
      setverificationError(error.message);
    } finally {
      setverificationLoading(false);
    }
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setverificationMessage("");
    setverificationError("");
    setverificationLoading(true);
    try {
      await verifyEmailCode(otp);
      onUserUpdated({ ...currentUser, emailVerified: true });
      setotpSent(false);
      setotp("");
      setverificationPopupOpen(false);
      setverificationMessage("");
    } catch (error) {
      setverificationError(error.message);
    } finally {
      setverificationLoading(false);
    }
  };

  const handleAddSites = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  const handleLogout = async () => {
    setLogoutError("");
    setLogoutPending(true);

    try {
      await logoutAccount();
      onLogout();
      setLogoutPopupOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      setLogoutError(error.message);
    } finally {
      setLogoutPending(false);
    }
  };
  
  // const handleLogout = () => {
  //   onLogout();
  //   setLogoutPopupOpen(false);
  //   navigate("/login");
  // };

  return (
    <>
      {logoutPopupOpen && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setLogoutPopupOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Confirm logout"
            className="rounded-2xl border border-white/10 bg-[#101326] p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-sm font-semibold text-white">
              Log out of DropPin?
            </p>
            <p className="mt-1 text-sm text-slate-400">
              You’ll need to log in again to access your account.
            </p>

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setLogoutPopupOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={logoutPending}
                onClick={handleLogout}
                className="rounded-lg border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-sm font-medium text-rose-200 transition hover:bg-rose-400/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {logoutPending ? "Logging out..." : "Log out"}
              </button>
            </div>
            {logoutError && (
              <p className="mt-3 text-sm text-rose-300" role="alert">
                {logoutError}
              </p>
            )}
          </div>
        </div>
      )}

      {verificationPopupOpen && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => {
            if (!verificationLoading) setverificationPopupOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="verify-email-dialog-title"
            className="w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-white/10 bg-[#101326] p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <p
              id="verify-email-dialog-title"
              className="text-sm font-semibold text-white"
            >
              {otpSent ? "Enter your verification code" : "Verify your email?"}
            </p>
            <p className="mt-1 text-sm text-slate-400">
              {otpSent
                ? `Enter the six-digit code sent to ${currentUser?.email}.`
                : `We’ll send a six-digit verification code to ${currentUser?.email}.`}
            </p>

            {otpSent ? (
              <form onSubmit={handleVerifyEmail} className="mt-4 space-y-4">
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  aria-label="Email verification code"
                  placeholder="Six-digit code"
                  value={otp}
                  onChange={(event) =>
                    setotp(event.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  maxLength={6}
                  required
                  className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/20"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    disabled={verificationLoading}
                    onClick={() => setverificationPopupOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={verificationLoading || otp.length !== 6}
                    className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {verificationLoading ? "Checking..." : "Confirm"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  disabled={verificationLoading}
                  onClick={() => setverificationPopupOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={verificationLoading}
                  onClick={handleEmailVerification}
                  className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {verificationLoading ? "Sending..." : "Send code"}
                </button>
              </div>
            )}
            {verificationError && (
              <p className="mt-3 text-sm text-rose-300" role="alert">
                {verificationError}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="profile-page">
        <main className="profile-layout">
          <section className="profile-card" aria-labelledby="profile-title">
            <header className="profile-header">
              <div className="profile-avatar" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="profile-avatar__icon"
                >
                  <circle cx="12" cy="8" r="3.5" />
                  <path d="M5 20a7 7 0 0 1 14 0" />
                </svg>
              </div>
              <div className="profile-header__copy">
                <p className="profile-eyebrow">Account settings</p>
                <h1 id="profile-title" className="profile-title">
                  Your profile
                </h1>
                <p className="profile-subtitle">
                  Manage your personal details and account security.
                </p>
              </div>
              <span className="profile-status">
                <span className="profile-status__dot" />
                Active Account
              </span>
            </header>

            <div className="profile-details">
              <div className="profile-field">
                <div className="profile-field__copy">
                  <label
                    htmlFor="profile-username"
                    className="profile-field__label"
                  >
                    Username
                  </label>
                  <span className="profile-field__hint">
                    Your name in DropPin
                  </span>
                </div>
                <input
                  type="text"
                  id="profile-username"
                  name="username"
                  className="profile-field__input"
                  placeholder="Enter a username"
                />
                <button
                  type="button"
                  className="profile-inline-action hover:underline"
                  onClick={editUsername}
                >
                  Change username
                </button>
              </div>

              <div className="profile-field">
                <div className="profile-field__copy">
                  <label
                    htmlFor="profile-email"
                    className="profile-field__label"
                  >
                    Email
                  </label>
                  <span className="profile-field__hint">
                    Used for account access
                  </span>
                </div>
                <div className="gap-8 flex content-center">
                  <div className="inline-flex items-center rounded-lg border border-slate-500/40 bg-slate-900/40 px-35 py-2 text-slate-300">
                    {currentUser ? currentUser.email : "abc@email.xyz"}
                  </div>
                  <div className="inline-flex font-semibold">
                    {emailVerified ? (
                      <p className="text-green-500 font-sm">✓ Email Verified</p>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setverificationError("");
                          setverificationPopupOpen(true);
                        }}
                        className="text-sm hover:underline text-red-500! cursor-pointer"
                      >
                        Verify Email !
                      </button>
                    )}
                  </div>
                </div>
                {verificationMessage && (
                  <p
                    role="status"
                    aria-live="polite"
                    className="text-sm text-slate-300"
                  >
                    {verificationMessage}
                  </p>
                )}
              </div>

              <div className="profile-field">
                <div className="profile-field__copy">
                  <label
                    htmlFor="profile-sites"
                    className="profile-field__label"
                  >
                    Number of sites
                  </label>
                  <span className="profile-field__hint">
                    Websites saved in your vault
                  </span>
                </div>
                <div className="gap-8 flex content-center">
                  <div className="inline-flex items-center rounded-lg border border-slate-500/40 bg-slate-900/40 px-15 py-2 text-slate-300">
                    {passwordArray.length}
                  </div>
                  <div className="inline-flex font-semibold">
                    <button
                      type="button"
                      className="profile-inline-action hover:underline"
                      onClick={handleAddSites}
                    >
                      Add More
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-security">
              <div className="profile-security__copy">
                <span className="profile-security__title">
                  Keep your account secure
                </span>
                <span className="profile-security__hint">
                  Update your credentials whenever you need to.
                </span>
              </div>
              <div className="profile-security__actions">
                <button
                  type="button"
                  className="profile-button profile-button--secondary"
                >
                  Change password
                </button>
                <button
                  type="button"
                  className="profile-button profile-button--secondary"
                >
                  Change email
                </button>
              </div>
            </div>

            <footer className="profile-footer">
              <span className="profile-footer__note">
                Your account details are private and secure.
              </span>
              <button
                type="button"
                onClick={() => {
                  setLogoutError("");
                  setLogoutPopupOpen(true);
                }}
                aria-expanded={logoutPopupOpen}
                aria-haspopup="dialog"
                className="profile-button profile-button--logout"
              >
                Log out
              </button>
            </footer>
          </section>
        </main>
      </div>
    </>
  );
};

export default Profile;

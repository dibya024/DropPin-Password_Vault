import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import {logoutAccount} from "../api/auth";

import "../../CSS/Navbar.css";

const Navbar = ({ isloggedin, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutPopupOpen, setLogoutPopupOpen] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const [logoutPending, setLogoutPending] = useState(false);

  const navigate= useNavigate();

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
  }

  const navLinks = [
    { name: "Home", href: "/home" },
    { name: "View Store", href: "/view-store" },
    { name: "Settings", href: "/settings" },
    { name: "You", href: "/profile" },
  ];

  const preLogLinks = [
    { name: "Login", href: "/login" },
    { name: "Sign Up", href: "/signup" },
  ];

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
      <nav className="sticky top-0 z-50 w-full border-b border-white/8 bg-[#080a18]/85 text-white shadow-lg shadow-black/10 backdrop-blur-2xl">
        <div className="h-px w-full bg-linear-to-r from-transparent via-violet-500/70 to-transparent" />

        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8">
          <div className="pointer-events-none absolute left-1/4 top-0 -z-10 h-20 w-40 rounded-full bg-violet-500/10 blur-3xl" />

          <Link
            to={isloggedin ? "/home" : "/"}
            aria-label="DropPin home"
            onClick={() => setMenuOpen(false)}
            className="group inline-flex items-center gap-2.5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300/20 bg-linear-to-br from-violet-500/20 to-cyan-400/10 shadow-inner shadow-white/5 transition duration-300 group-hover:border-cyan-300/40 group-hover:shadow-cyan-500/10">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-5 w-5 text-cyan-200"
              >
                <path d="M12 3 5 6v5c0 4.5 2.8 8.1 7 10 4.2-1.9 7-5.5 7-10V6l-7-3Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                <span className="bg-linear-to-r from-orange-500 via-pink-500 to-violet-500 bg-clip-text text-transparent">
                  Drop
                </span>
                <span className="bg-linear-to-r from-violet-500 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Pin
                </span>
              </span>
              <span className="mt-1 hidden text-[9px] font-semibold tracking-[0.22em] text-slate-400 uppercase sm:block">
                Password vault
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 md:flex">
            {isloggedin ? (
              <>
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.href}
                      end={link.href === "/"}
                      className={({ isActive }) =>
                        `relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-400 ${
                          isActive
                            ? "bg-linear-to-r from-violet-400/50 to-cyan-300/20 text-cyan-100 shadow-sm shadow-cyan-950/20"
                            : "text-slate-400 hover:bg-white/6 hover:text-slate-100"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <span className="inline-flex items-center gap-1">
                          {link.name}
                        </span>
                      )}
                    </NavLink>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setLogoutError("");
                      setLogoutPopupOpen(true);
                    }}
                    aria-expanded={logoutPopupOpen}
                    aria-haspopup="dialog"
                    className="rounded-full border border-rose-400/20 bg-rose-400/5 px-4 py-2 text-sm font-medium text-rose-200 transition hover:border-rose-400/40 hover:bg-rose-400/10 hover:text-rose-100 cursor-pointer"
                  >
                    Log out
                  </button>
                </li>
              </>
            ) : (
              preLogLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.href}
                    end={link.href === "/"}
                    className={({ isActive }) =>
                      `relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-400 ${
                        isActive
                          ? "bg-linear-to-r from-violet-400/50 to-cyan-300/20 text-cyan-100 shadow-sm shadow-cyan-950/20"
                          : "text-slate-400 hover:bg-white/6 hover:text-slate-100"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <span className="inline-flex items-center gap-1">
                        {link.name}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))
            )}
          </ul>

          <button
            type="button"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/4 text-slate-200 transition hover:border-violet-400/40 hover:bg-white/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 md:hidden"
          >
            {menuOpen ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-6 w-6"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-6 w-6"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>

        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out md:hidden ${
            menuOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <ul className="space-y-1 border-t border-white/[0.07] bg-[#080a18]/95 px-4 py-3 sm:px-8">
              {isloggedin ? (
                <>
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <NavLink
                        to={link.href}
                        end={link.href === "/"}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                            isActive
                              ? "border border-cyan-300/10 bg-linear-to-r from-violet-400/15 to-cyan-400/10 text-cyan-100"
                              : "text-slate-300 hover:bg-white/5 hover:text-white"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {link.name}
                            {isActive && (
                              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
                            )}
                          </>
                        )}
                      </NavLink>
                    </li>
                  ))}
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setLogoutError("");
                        setMenuOpen(false);
                        setLogoutPopupOpen(true);
                      }}
                      aria-expanded={logoutPopupOpen}
                      aria-haspopup="dialog"
                      className="w-full rounded-xl border border-rose-400/20 bg-rose-400/5 px-4 py-3 text-left text-sm font-medium text-rose-100 transition hover:bg-rose-400/10"
                    >
                      Log out
                    </button>
                  </li>
                </>
              ) : (
                preLogLinks.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.href}
                      end={link.href === "/"}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                          isActive
                            ? "border border-cyan-300/10 bg-linear-to-r from-violet-400/15 to-cyan-400/10 text-cyan-100"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {link.name}
                          {isActive && (
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
                          )}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

//{rafce}//

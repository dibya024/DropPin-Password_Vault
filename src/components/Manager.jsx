import { useRef, useState, useEffect } from "react";

import React from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuid } from "uuid";

import saveIcon from "../images/save-icon.png";
import eye from "../images/eye.png";
import eyeCross from "../images/cross-eye.png";

const Manager = ({ passwordArray, setpasswordArray, form, setform }) => {
  const ref = useRef(null);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const showPassword = () => {
    setPasswordVisible((previous) => !previous);
  };

  const savePassword = (e) => {
    e.preventDefault();

    const updatedPasswords = [...passwordArray, { ...form, id: uuid() }];

    setpasswordArray(updatedPasswords);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));

    setform({
      site: "",
      username: "",
      password: "",
    });

    toast("Password saved successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

    setPasswordVisible(false);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-600/40 focus:ring-4 focus:ring-cyan-400/10 hover:border-white/20";

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="home-page relative isolate min-h-screen overflow-hidden text-slate-100">
        <div
          aria-hidden="true"
          className="home-page__backdrop pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="home-page__orb home-page__orb--violet" />
          <div className="home-page__orb home-page__orb--cyan" />
          <div className="home-page__orb home-page__orb--rose" />
          <div className="home-page__grid" />
          <div className="home-page__vignette" />
        </div>

        <main className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <header className="home-header mb-10 text-center sm:mb-14">
            <div className="home-header__badge mb-3 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/5 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-violet-200 uppercase">
              <span aria-hidden="true" className="home-header__status-dot" />
              Your personal vault
            </div>

            <h1 className="home-header__title cursor-pointer text-4xl font-extrabold tracking-tight sm:text-5xl">
              <span className="text-slate-200">&lt;</span>
              <span className="home-header__word home-header__word--drop bg-linear-to-r from-orange-500 via-pink-500 to-violet-500 bg-clip-text text-transparent">
                Drop
              </span>
              <span className="home-header__word home-header__word--pin bg-linear-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Pin
              </span>
              <span className="text-slate-400">/&gt;</span>
            </h1>

            <p className="home-header__description mt-4 text-sm text-slate-400 sm:text-base">
              Your passwords, organized in one secure place.
            </p>

            <div
              aria-hidden="true"
              className="home-header__divider mx-auto mt-7 h-px w-200"
            />
          </header>

          <section className="rounded-3xl bg-white/5 p-5 border border-white/30 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8">
            <div className="mb-7 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-400/20 bg-linear-to-br from-violet-500/20 to-cyan-400/10">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-6 w-6 text-cyan-300"
                >
                  <rect x="4" y="10" width="16" height="11" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  <path d="M12 14v3" />
                </svg>
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  Add a password
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Store your login details for quick access.
                </p>
              </div>
            </div>

            <form onSubmit={savePassword} className="space-y-5">
              <div>
                <label
                  htmlFor="site"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Website URL
                </label>

                <input
                  id="site"
                  placeholder="https://example.com"
                  value={form.site}
                  name="site"
                  onChange={handleChange}
                  type="text"
                  required
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="username"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Username
                  </label>

                  <input
                    id="username"
                    placeholder="Enter your username"
                    value={form.username}
                    name="username"
                    onChange={handleChange}
                    type="text"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      ref={ref}
                      placeholder="Enter your password"
                      value={form.password}
                      name="password"
                      onChange={handleChange}
                      type={passwordVisible ? "text" : "password"}
                      required
                      className={`${inputClass} pr-12`}
                    />

                    <button
                      type="button"
                      onClick={showPassword}
                      aria-label={
                        passwordVisible ? "Hide password" : "Show password"
                      }
                      title={
                        passwordVisible ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 transition hover:bg-white/10"
                    >
                      <img
                        src={passwordVisible ? eyeCross : eye}
                        alt=""
                        className="h-5 w-5 opacity-70 transition hover:opacity-100"
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-3 sm:justify-end">
                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-violet-800 via-blue-800 to-cyan-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-950/30 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-400/20 active:translate-y-0 sm:w-auto"
                >
                  <img
                    src={saveIcon}
                    alt=""
                    className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                  />
                  Save
                </button>
              </div>
            </form>
          </section>

          <footer className="mt-10 pb-4 text-center text-xs text-slate-500">
            Crafted with{" "}
            <span className="bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text font-semibold text-transparent">
              DropPin
            </span>{" "}
            · Keep your digital life organized.
          </footer>
        </main>
      </div>
    </>
  );
};

export default Manager;

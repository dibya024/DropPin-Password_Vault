import React from "react";
import { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";

import eye from "../images/eye.png";
import eyeCross from "../images/cross-eye.png";
import copy_img from "../images/copy.png";
import edit_img from "../images/edit.png";
import delete_img from "../images/delete.png";

const ViewStore = ({ passwordArray, setpasswordArray, form, setform }) => {
  const [visiblePasswordIds, setvisiblePasswordIds] = useState([]);
  const navigate = useNavigate();

  const toggleSavedPassword = (id) => {
    setvisiblePasswordIds((previous) =>
      previous.includes(id)
        ? previous.filter((visibleId) => visibleId !== id)
        : [...previous, id],
    );
  };

  const deletePassword = (e, id) => {
    console.log(`Deleting password of ID : ${id}`);
    e.preventDefault();
    let cfm = confirm("Delete this password ?");
    if (cfm) {
      const updatedPasswords = passwordArray.filter((item) => item.id !== id);
      setpasswordArray(updatedPasswords);

      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    }
    toast("Password deleted successfully!", {
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
  };

  const editPassword = (e, id) => {
    console.log(`Editing password of ID : ${id}`);
    e.preventDefault();

    setform(passwordArray.filter((item) => item.id === id)[0]);
    const updatedPasswords = passwordArray.filter((item) => item.id !== id);

    navigate("/");
    setpasswordArray(updatedPasswords);
  };

  const copyText = (text) => {
    // alert("Copied to clipboard");
    toast("copied to clipboard!", {
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
    navigator.clipboard.writeText(text);
  };

  const cardColors = [
    "border-cyan-300/20 bg-cyan-900/25",
    "border-orange-300/20 bg-orange-900/25",
    "border-violet-300/20 bg-violet-900/25",
    "border-rose-300/20 bg-rose-900/25",
    "border-emerald-300/20 bg-emerald-900/25",
    "border-amber-300/20 bg-amber-900/25",
  ];

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
      <div className="viewstore-page relative isolate min-h-screen overflow-hidden text-slate-100">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="viewstore-glow viewstore-glow--violet absolute -top-40 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full bg-violet-600/25 blur-[130px]" />

          <div className="viewstore-glow viewstore-glow--cyan absolute -left-37.5 top-[25%] h-125 w-125 rounded-full bg-cyan-500/15 blur-[140px]" />

          <div className="viewstore-glow viewstore-glow--fuchsia absolute -right-32 top-[55%] h-125 w-125 rounded-full bg-fuchsia-600/10 blur-[140px]" />

          <div className="viewstore-glow viewstore-glow--orange absolute -bottom-40 left-1/3 h-100 w-100 rounded-full bg-orange-500/10 blur-[130px]" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.035)_1px,transparent_0)] bg-size-[30px_30px]" />

          <div className="absolute inset-0 bg-linear-to-b from-[#0b0d1b]/10 via-[#0b0d1b]/40 to-[#0b0d1b]/95" />
        </div>

        <main className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <header className="viewstore-header relative mx-auto mb-10 max-w-3xl px-5 py-8 text-center sm:mb-14 sm:px-10 sm:py-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-24 h-56 w-56 rounded-full bg-violet-500/15 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 -left-16 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl"
            />

            <div className="relative">
              <div className="viewstore-header__badge mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/5 px-4 py-1.5 text-xs font-semibold tracking-[0.16em] text-violet-200 uppercase">
                <span
                  aria-hidden="true"
                  className="viewstore-header__status-dot h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.8)]"
                />
                Your own personal vault
              </div>

              <h1
                aria-label="DropPin"
                className="viewstore-header__mark mx-auto flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24"
              >
                <span className="viewstore-header__logo relative flex h-16 w-16 items-center justify-center rounded-[1.35rem] bg-linear-to-br from-orange-400 via-fuchsia-500 to-cyan-400 shadow-lg shadow-violet-500/30 sm:h-20 sm:w-20">
                  <span className="absolute inset-1 rounded-[1.1rem] bg-[#111326]" />
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 32 32"
                    fill="none"
                    className="relative h-10 w-10 sm:h-12 sm:w-12"
                  >
                    <path
                      d="M16 3.5c-6 0-10 4.5-10 10.1 0 7.1 10 15 10 15s10-7.9 10-15C26 8 22 3.5 16 3.5Z"
                      stroke="url(#droppin-gradient)"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M12.5 14v-2a3.5 3.5 0 0 1 7 0v2m-8 0h9v7h-9v-7Z"
                      stroke="url(#droppin-gradient)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <defs>
                      <linearGradient
                        id="droppin-gradient"
                        x1="6"
                        y1="4"
                        x2="27"
                        y2="28"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#fb923c" />
                        <stop offset=".5" stopColor="#e879f9" />
                        <stop offset="1" stopColor="#67e8f9" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>

              <div className="viewstore-header__vault-count mx-auto mt-4 inline-flex items-center gap-3 rounded-full border border-cyan-300/15 bg-slate-950/35 px-4 py-2">
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-cyan-300/10 text-cyan-200">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="relative h-4 w-4"
                  >
                    <rect x="4" y="10" width="16" height="11" rx="2" />
                    <path
                      className="vault-lock-shackle"
                      d="M8 10V7a4 4 0 0 1 8 0v3"
                    />
                    <path d="m10 15 1.5 1.5L14.5 13" />
                  </svg>
                </span>
                <span className="text-sm text-slate-300">
                  <span className="font-semibold text-white">
                    {passwordArray.length}
                  </span>{" "}
                  {passwordArray.length === 1 ? "login" : "logins"} in your
                  vault
                </span>
              </div>

              <div
                aria-hidden="true"
                className="viewstore-header__divider mx-auto mt-7 h-px w-48"
              />
            </div>
          </header>

          <section className="relative rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl sm:mt-12 sm:p-8">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 h-1/2 w-1/2 rounded-tr-3xl border-r border-t border-white/10"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 h-1/2 w-1/2 rounded-bl-3xl border-b border-l border-white/10"
            />
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  Your passwords
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Manage your saved login details.
                </p>
              </div>

              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-sm font-medium text-cyan-300">
                {passwordArray.length}{" "}
                {passwordArray.length === 1 ? "entry" : "entries"}
              </span>
            </div>

            {passwordArray.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/30 px-4 py-12 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-linear-to-br from-violet-500/15 to-cyan-400/10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-7 w-7 text-violet-300"
                  >
                    <rect x="4" y="10" width="16" height="11" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>
                </div>

                <p className="font-semibold text-slate-200">
                  Your vault is empty
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Add your first login above to get started.
                </p>
              </div>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                {passwordArray.map((item) => {
                  const isPasswordVisible = visiblePasswordIds.includes(
                    item.id,
                  );
                  const colorIdx =
                    [...item.id].reduce(
                      (sum, char) => sum + char.charCodeAt(0),
                      0,
                    ) % cardColors.length;

                  return (
                    <article
                      key={item.id}
                      className={`group rounded-2xl border p-4 transition duration-200 hover:brightness-110 sm:p-5 ${cardColors[colorIdx]}`}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-300/15 bg-cyan-300/[0.07] text-sm font-bold uppercase text-cyan-100">
                          {item.site?.replace(/^https?:\/\//i, "")?.[0] || "S"}
                        </div>
                        <div className="min-w-0 flex-1">
                          <a
                            href={
                              /^https?:\/\//i.test(item.site)
                                ? item.site
                                : `https://${item.site}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block truncate text-sm font-semibold text-slate-100 transition hover:text-cyan-200"
                          >
                            {item.site}
                          </a>
                          <p className="mt-1 truncate text-xs text-slate-500">
                            Saved login
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyText(item.site)}
                          aria-label={`Copy website ${item.site}`}
                          title="Copy website"
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/3 transition hover:border-cyan-300/20 hover:bg-cyan-300/10"
                        >
                          <img
                            src={copy_img}
                            alt=""
                            className="h-4 w-4 opacity-70"
                          />
                        </button>
                      </div>

                      <div className="mt-5 grid gap-4 border-t border-white/[0.07] pt-4 sm:grid-cols-2">
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold tracking-[0.14em] text-slate-500 uppercase">
                            Username
                          </p>
                          <div className="mt-1 flex items-center gap-2">
                            <p className="min-w-0 flex-1 truncate text-sm text-slate-300">
                              {item.username}
                            </p>
                            <button
                              type="button"
                              onClick={() => copyText(item.username)}
                              aria-label={`Copy username for ${item.site}`}
                              title="Copy username"
                              className="rounded-md p-1 text-slate-500 transition hover:bg-white/6 hover:text-cyan-200"
                            >
                              <img
                                src={copy_img}
                                alt=""
                                className="h-3.5 w-3.5 opacity-70"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold tracking-[0.14em] text-slate-500 uppercase">
                            Password
                          </p>
                          <div className="mt-1 flex items-center gap-2">
                            <p className="min-w-0 flex-1 truncate font-mono text-sm tracking-[0.12em] text-slate-300">
                              {isPasswordVisible
                                ? item.password
                                : "••••••••••••"}
                            </p>
                            <button
                              type="button"
                              onClick={() => toggleSavedPassword(item.id)}
                              aria-label={
                                isPasswordVisible
                                  ? `Hide password for ${item.site}`
                                  : `Show password for ${item.site}`
                              }
                              title={
                                isPasswordVisible
                                  ? "Hide password"
                                  : "Show password"
                              }
                              className="rounded-md p-1 text-slate-500 transition hover:bg-white/6 hover:text-cyan-200"
                            >
                              <img
                                src={isPasswordVisible ? eyeCross : eye}
                                alt=""
                                className="h-4 w-4 opacity-70"
                              />
                            </button>
                            <button
                              type="button"
                              onClick={() => copyText(item.password)}
                              aria-label={`Copy password for ${item.site}`}
                              title="Copy password"
                              className="rounded-md p-1 text-slate-500 transition hover:bg-white/6 hover:text-cyan-200"
                            >
                              <img
                                src={copy_img}
                                alt=""
                                className="h-3.5 w-3.5 opacity-70"
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end gap-2 border-t border-white/[0.07] pt-3">
                        <button
                          type="button"
                          onClick={(e) => editPassword(e, item.id)}
                          aria-label={`Edit password for ${item.site}`}
                          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-400 transition hover:bg-white/6 hover:text-white"
                        >
                          <img
                            src={edit_img}
                            alt=""
                            className="h-4 w-4 opacity-70"
                          />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={(e) => deletePassword(e, item.id)}
                          aria-label={`Delete password for ${item.site}`}
                          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-400 transition hover:bg-rose-400/10 hover:text-rose-200"
                        >
                          <img
                            src={delete_img}
                            alt=""
                            className="h-4 w-4 opacity-70"
                          />
                          Delete
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            <p className="mt-5 text-xs leading-relaxed text-slate-500">
              DropPin stores these entries in your browser's local storage.
              Avoid using it for real credentials until you implement encryption
              and appropriate security protections.
            </p>
          </section>
        </main>
      </div>
    </>
  );
};

export default ViewStore;

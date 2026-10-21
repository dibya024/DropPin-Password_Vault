import { useRef, useState, useEffect } from "react";
import saveIcon from "../images/save-icon.png";
import eye from "../images/eye.png";
import eyeCross from "../images/eye-cross.png";

const Manager = () => {
  const ref = useRef(null);

  const [form, setform] = useState({
    site: "",
    username: "",
    password: "",
  });

  const [passwordArray, setpasswordArray] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    try {
      const passwords = localStorage.getItem("passwords");

      if (passwords) {
        setpasswordArray(JSON.parse(passwords));
      }
    } catch (error) {
      console.error("Unable to load saved passwords:", error);
    }
  }, []);

  const showPassword = () => {
    setPasswordVisible((previous) => !previous);
  };

  const savePassword = (e) => {
    e.preventDefault();

    const updatedPasswords = [...passwordArray, form];

    setpasswordArray(updatedPasswords);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));

    setform({
      site: "",
      username: "",
      password: "",
    });

    setPasswordVisible(false);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-400/60 focus:ring-4 focus:ring-cyan-400/10 hover:border-white/20";

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#060816] text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[130px]" />

        <div className="absolute -left-37.5 top-[35%] h-100 w-100 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute -right-32 -bottom-25 h-100 w-100 rounded-full bg-orange-500/10 blur-[130px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] bg-size-[26px_26px]" />

        <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#060816]/20 to-[#060816]" />
      </div>

      <main className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <header className="mb-10 text-center sm:mb-14">
          <div className="mb-3 inline-flex items-center rounded-full border border-violet-400/20 bg-violet-400/5 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-violet-200 uppercase">
            Your personal vault
          </div>

          <h1 className="cursor-pointer text-4xl font-extrabold tracking-tight sm:text-5xl">
            <span className="text-slate-300">&lt;</span>
            <span className="bg-linear-to-r from-orange-300 via-pink-300 to-violet-400 bg-clip-text text-transparent">
              Drop
            </span>
            <span className="bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Pin
            </span>
            <span className="text-slate-300">/&gt;</span>
          </h1>

          <p className="mt-4 text-sm text-slate-400 sm:text-base">
            Your passwords, organized in one secure place.
          </p>

          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-linear-to-r from-orange-400 via-violet-500 to-cyan-400" />
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/4.5 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8">
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
                    title={passwordVisible ? "Hide password" : "Show password"}
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
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-violet-600 via-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-950/30 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/20 active:translate-y-0 sm:w-auto"
              >
                <img
                  src={saveIcon}
                  alt=""
                  className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                />
                Add Password
              </button>
            </div>
          </form>
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl sm:mt-12 sm:p-8">
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
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full min-w-150 border-collapse text-left text-sm">
                <thead className="bg-linear-to-r from-violet-500/20 via-blue-500/15 to-cyan-400/10 text-slate-200">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Website</th>
                    <th className="px-5 py-4 font-semibold">Username</th>
                    <th className="px-5 py-4 font-semibold">Password</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/6 bg-slate-950/40">
                  {passwordArray.map((item, index) => (
                    <tr
                      key={index}
                      className="transition-colors duration-200 hover:bg-white/4"
                    >
                      <td className="max-w-60 truncate px-5 py-4">
                        <a
                          href={
                            /^https?:\/\//i.test(item.site)
                              ? item.site
                              : `https://${item.site}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-300 underline decoration-cyan-300/20 underline-offset-4 transition hover:text-cyan-200 hover:decoration-cyan-300"
                        >
                          {item.site}
                        </a>
                      </td>

                      <td className="max-w-50 truncate px-5 py-4 text-slate-300">
                        {item.username}
                      </td>

                      <td className="max-w-50 truncate px-5 py-4 font-mono text-slate-400">
                        {item.password}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <p className="mt-5 text-xs leading-relaxed text-slate-500">
            DropPin stores these entries in your browser's local storage. Avoid
            using it for real credentials until you implement encryption and
            appropriate security protections.
          </p>
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
  );
};

export default Manager;

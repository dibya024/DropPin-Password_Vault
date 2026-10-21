import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Contact Us", href: "#contact" },
    { name: "Help", href: "#help" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#060816]/90 text-white shadow-lg shadow-black/10 backdrop-blur-2xl">
      <div className="h-0.5 w-full bg-linear-to-r from-orange-400 via-violet-500 to-cyan-400" />

      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <div className="pointer-events-none absolute left-1/3 top-0 -z-10 h-20 w-40 rounded-full bg-violet-500/10 blur-3xl" />

        <a
          href="#home"
          aria-label="DropPin home"
          className="group text-2xl font-extrabold tracking-tight transition-transform duration-300 hover:scale-105 sm:text-3xl"
        >
          <span className="text-slate-300">&lt;</span>
          <span className="bg-linear-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent">
            Drop
          </span>
          <span className="bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Pin
          </span>
          <span className="text-slate-300">/&gt;</span>
        </a>

        <ul className="hidden items-center gap-2 md:flex lg:gap-4">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="group relative block rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition-colors duration-300 hover:text-white"
              >
                {link.name}
                <span className="absolute bottom-1 left-4 right-4 h-0.5 origin-left scale-x-0 rounded-full bg-linear-to-r from-violet-400 to-cyan-400 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:border-violet-400/40 hover:bg-white/10 md:hidden"
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
          menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="space-y-1 border-t border-white/5 px-5 py-3 sm:px-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-colors duration-200 hover:bg-linear-to-r hover:from-violet-500/10 hover:to-cyan-500/10 hover:text-cyan-300"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

//{rafce}//

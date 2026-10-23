import React from "react";
import loveImg from "../images/love-img.jpg";

const Footer = () => {
  return (
    <footer className="bottom-0 left-0 z-50 w-full overflow-hidden border-t border-white/10 bg-[#060816]/90 text-white shadow-[0_-10px_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
      <div className="absolute left-0 top-0 h-px w-full bg-linear-to-r from-transparent via-violet-500 to-cyan-400" />

      <div className="pointer-events-none absolute -top-16 left-1/2 h-24 w-64 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center justify-center gap-2 px-4 py-4 sm:flex-row sm:justify-between sm:gap-4 sm:px-6">
        <div className="cursor-pointer text-xl font-extrabold tracking-tight transition-transform duration-300 hover:scale-105">
          <span className="text-slate-200">&lt;</span>
          <span className="bg-linear-to-r from-orange-500 via-pink-500 to-violet-500 bg-clip-text text-transparent">
            Drop
          </span>
          <span className="bg-linear-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Pin
          </span>
          <span className="text-slate-400">/&gt;</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span>Crafted with</span>

          <img
            src={loveImg}
            alt="love"
            className="h-5 w-5 rounded-full object-cover transition-transform duration-300 hover:scale-125"
          />

          <span>by</span>

          <span className="font-semibold text-slate-200 transition-colors duration-300 hover:text-cyan-300">
            Dibyaranjan
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

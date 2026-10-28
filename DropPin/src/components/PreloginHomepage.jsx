import { Link } from "react-router-dom";

import "../../CSS/PreloginHomepage.css";

const PreloginHomepage = () => (
  <main className="prelogin-page">
    <section className="prelogin-hero" aria-labelledby="prelogin-title">
      <div className="prelogin-hero__copy">
        <p className="prelogin-hero__eyebrow">
          <span aria-hidden="true" />
          A simpler way to manage logins
        </p>

        <h1 id="prelogin-title">
          Your logins.
          <br />
          <span>One less thing</span>
          <br />
          to worry about.
        </h1>

        <p className="prelogin-hero__description">
          Keep your passwords organized in one place, so signing in feels a
          little simpler.
        </p>

        <div className="prelogin-hero__actions">
          <Link className="prelogin-button prelogin-button--primary" to="/signup">
            Create your vault
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M4 10h12m-5-5 5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link className="prelogin-button prelogin-button--secondary" to="/login">
            Sign in
          </Link>
        </div>
      </div>

      <div className="prelogin-hero__visual" aria-hidden="true">
        <div className="prelogin-hero__halo" />
        <div className="prelogin-hero__logo-frame">
          <span className="prelogin-hero__logo-inner" />
          <svg viewBox="0 0 32 32" fill="none">
            <path
              d="M16 3.5c-6 0-10 4.5-10 10.1 0 7.1 10 15 10 15s10-7.9 10-15C26 8 22 3.5 16 3.5Z"
              stroke="url(#prelogin-droppin-gradient)"
              strokeWidth="2.5"
            />
            <path
              d="M12.5 14v-2a3.5 3.5 0 0 1 7 0v2m-8 0h9v7h-9v-7Z"
              stroke="url(#prelogin-droppin-gradient)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <defs>
              <linearGradient
                id="prelogin-droppin-gradient"
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
        </div>
      </div>
    </section>
  </main>
);

export default PreloginHomepage;

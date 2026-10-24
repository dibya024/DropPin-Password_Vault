import { Link } from "react-router-dom";

import "../../CSS/PreloginHomepage.css"

import heroArtwork from "../assets/hero.png";

const PreloginHomepage = () => {
  return (
    <div className="prelogin-page">
      <div
        className="prelogin-page__glow prelogin-page__glow--cyan"
        aria-hidden="true"
      />
      <div
        className="prelogin-page__glow prelogin-page__glow--violet"
        aria-hidden="true"
      />
      <div className="prelogin-page__grid" aria-hidden="true" />

      <div className="prelogin-page__content">
        <section className="prelogin-hero">
          <div className="prelogin-hero__copy">
            <div className="prelogin-hero__eyebrow">
              <span className="prelogin-hero__eyebrow-dot" />
              A LITTLE MORE PEACE OF MIND
            </div>

            <h1>
              Your passwords.
              <br />
              <span>Finally in</span>
              <br />
              <span className="prelogin-hero__title-accent">one safe place.</span>
            </h1>

            <p className="prelogin-hero__description">
              Keep your logins organized, close at hand, and out of your notes
              app. Meet a calmer way to manage your digital life.
            </p>

            <div className="prelogin-hero__actions">
              <Link
                className="prelogin-button prelogin-button--primary"
                to="/signup"
              >
                Create your free vault
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
              <Link
                className="prelogin-button prelogin-button--secondary"
                to="/login"
              >
                I already have an account
              </Link>
            </div>

            <div className="prelogin-hero__note">
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
              Your vault, organized on your terms.
            </div>
          </div>

          <div className="prelogin-visual" aria-hidden="true">
            <div className="prelogin-visual__halo" aria-hidden="true" />
            <img
              className="prelogin-visual__artwork"
              src={heroArtwork}
              alt=""
              aria-hidden="true"
            />

            <div className="prelogin-vault">
              <div className="prelogin-vault__topbar">
                <span className="prelogin-vault__brand">
                  <span className="prelogin-vault__brand-mark">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
                  </span>
                  <span>My vault</span>
                </span>
                <span className="prelogin-vault__status">
                  <span />
                  READY
                </span>
              </div>

              <div className="prelogin-vault__welcome">
                <span>YOUR DIGITAL LIFE</span>
                <strong>All in one place.</strong>
              </div>

              <div className="prelogin-vault__summary">
                <div>
                  <span className="prelogin-vault__summary-icon prelogin-vault__summary-icon--cyan">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
                        d="M8 10V7a4 4 0 0 1 8 0v3"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <span>
                    <small>Saved logins</small>
                    <strong>All together</strong>
                  </span>
                </div>
                <span className="prelogin-vault__summary-sparkle">✦</span>
              </div>

              <div className="prelogin-vault__label">RECENTLY ADDED</div>
              <div className="prelogin-vault__item">
                <span className="prelogin-vault__service prelogin-vault__service--blue">
                  G
                </span>
                <span className="prelogin-vault__item-copy">
                  <strong>Google</strong>
                  <small>Personal account</small>
                </span>
                <span className="prelogin-vault__password-dots">••••••••</span>
              </div>
              <div className="prelogin-vault__item">
                <span className="prelogin-vault__service prelogin-vault__service--violet">
                  N
                </span>
                <span className="prelogin-vault__item-copy">
                  <strong>Netflix</strong>
                  <small>Entertainment</small>
                </span>
                <span className="prelogin-vault__password-dots">••••••••</span>
              </div>
              <div className="prelogin-vault__item prelogin-vault__item--last">
                <span className="prelogin-vault__service prelogin-vault__service--orange">
                  ✦
                </span>
                <span className="prelogin-vault__item-copy">
                  <strong>More accounts</strong>
                  <small>One vault, less clutter</small>
                </span>
                <span className="prelogin-vault__item-arrow">↗</span>
              </div>
            </div>

            <div className="prelogin-float-card prelogin-float-card--top">
              <span className="prelogin-float-card__icon">
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="m5 10 3.2 3.2L15 6.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>
                <strong>Neatly organized</strong>
                <small>Your logins, at a glance</small>
              </span>
            </div>

            <div className="prelogin-float-card prelogin-float-card--bottom">
              <span className="prelogin-float-card__lock">⌑</span>
              <span>
                <strong>Made for your peace of mind</strong>
                <small>A home for your passwords</small>
              </span>
            </div>
          </div>
        </section>

        <section
          className="prelogin-features"
          id="features"
          aria-label="Why DropPin"
        >
          <div className="prelogin-features__intro">
            <span>LESS PASSWORD CHAOS</span>
            <h2>A better place for the keys to your online life.</h2>
          </div>

          <article className="prelogin-feature">
            <span
              className="prelogin-feature__icon prelogin-feature__icon--cyan"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 7h14M5 12h14M5 17h9"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
                <circle cx="3.5" cy="7" r=".7" fill="currentColor" />
                <circle cx="3.5" cy="12" r=".7" fill="currentColor" />
                <circle cx="3.5" cy="17" r=".7" fill="currentColor" />
              </svg>
            </span>
            <h3>Everything, organized</h3>
            <p>Keep your saved logins together instead of scattered across notes and tabs.</p>
          </article>

          <article className="prelogin-feature">
            <span
              className="prelogin-feature__icon prelogin-feature__icon--violet"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 3 5 6v5c0 4.5 2.8 8.1 7 10 4.2-1.9 7-5.5 7-10V6l-7-3Z" stroke="currentColor" strokeWidth="1.6" />
                <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h3>Privacy comes first</h3>
            <p>A focused, personal space for the accounts that matter to you.</p>
          </article>

          <article className="prelogin-feature">
            <span
              className="prelogin-feature__icon prelogin-feature__icon--pink"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 12h15m-6-6 6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h3>Easy to get started</h3>
            <p>Create your vault and give your digital life a little more breathing room.</p>
          </article>
        </section>

        <section className="prelogin-bottom-cta">
          <div>
            <span>READY WHEN YOU ARE</span>
            <h2>Make room for a little more peace of mind.</h2>
          </div>
          <Link className="prelogin-button prelogin-button--primary" to="/signup">
            Get started
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default PreloginHomepage;

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import "../../CSS/Navbar.css";

const Navbar = ({ isloggedin }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = isloggedin
    ? [
        { name: "Home", href: "/home" },
        { name: "View Store", href: "/view-store" },
        { name: "You", href: "/profile" },
      ]
    : [
        { name: "Login", href: "/login" },
        { name: "Sign Up", href: "/signup" },
      ];

  const renderLinks = (mobile = false) =>
    links.map(({ name, href }) => (
      <li key={href}>
        <NavLink
          to={href}
          onClick={mobile ? () => setMenuOpen(false) : undefined}
          className={({ isActive }) =>
            `navbar__link${isActive ? " navbar__link--active" : ""}`
          }
        >
          {name}
          <span className="navbar__link-indicator" aria-hidden="true" />
        </NavLink>
      </li>
    ));

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link
          to={isloggedin ? "/home" : "/"}
          aria-label="DropPin home"
          onClick={() => setMenuOpen(false)}
          className="navbar__brand"
        >
          <span className="navbar__brand-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 3 5 6v5c0 4.5 2.8 8.1 7 10 4.2-1.9 7-5.5 7-10V6l-7-3Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </span>
          <span className="navbar__brand-copy">
            <span className="navbar__wordmark">
              <span className="navbar__wordmark-drop">Drop</span>
              <span className="navbar__wordmark-pin">Pin</span>
            </span>
            <span className="navbar__tagline">Password vault</span>
          </span>
        </Link>

        <ul className="navbar__links">{renderLinks()}</ul>

        <button
          type="button"
          className={`navbar__menu-button${menuOpen ? " navbar__menu-button--open" : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="navbar-mobile-menu"
        >
          {menuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      <div
        id="navbar-mobile-menu"
        className={`navbar__mobile-menu${menuOpen ? " navbar__mobile-menu--open" : ""}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <ul className="navbar__mobile-links">{renderLinks(true)}</ul>
      </div>
    </nav>
  );
};

export default Navbar;

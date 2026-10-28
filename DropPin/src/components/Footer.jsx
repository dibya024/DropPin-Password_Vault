import loveImg from "../images/love-img.jpg";
import "../../CSS/Footer.css";

const Footer = () => (
  <footer className="app-footer">
    <div className="app-footer__inner">
      <div className="app-footer__brand">
        <span className="app-footer__wordmark">
          <span>Drop</span>
          <span>Pin</span>
        </span>
        <span className="app-footer__tagline">Your personal password vault</span>
      </div>

      <div className="app-footer__credit">
        <span className="app-footer__credit-label">Made with care by</span>
        <span className="app-footer__creator">
          <img src={loveImg} alt="" aria-hidden="true" />
          Dibyaranjan
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;

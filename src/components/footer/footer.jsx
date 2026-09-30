import { FaInstagram, FaLinkedin, FaFacebook, FaEnvelope } from 'react-icons/fa';
import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>© Civil Engineering Society</p>
      <div className="footer-links">
        <a href="mailto:nitwarangal.cea@gmail.com" className="social-icon" aria-label="Email">
          <FaEnvelope />
        </a>
        <a href="https://www.instagram.com/cesnitw" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="https://www.linkedin.com/company/civil-engineering-society-nit-warangal/" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
        <a href="https://www.facebook.com/ceanitw21/" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FaFacebook />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
import { FaInstagram, FaLinkedin, FaFacebook, FaEnvelope } from 'react-icons/fa';
import useSettings from '../../hooks/useSettings';
import { contactDefaults } from '../../data/settings';
import './footer.css';

function Footer() {
  const c = useSettings('contact', contactDefaults);

  return (
    <footer className="footer">
      <p>© Civil Engineering Society</p>
      <div className="footer-links">
        {c.email && (
          <a href={`mailto:${c.email}`} className="social-icon" aria-label="Email">
            <FaEnvelope />
          </a>
        )}
        {c.instagram && (
          <a href={c.instagram} className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
        )}
        {c.linkedin && (
          <a href={c.linkedin} className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        )}
        {c.facebook && (
          <a href={c.facebook} className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook />
          </a>
        )}
      </div>
    </footer>
  );
}

export default Footer;
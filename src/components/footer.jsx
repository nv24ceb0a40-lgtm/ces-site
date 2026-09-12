import { FaInstagram, FaLinkedin, FaFacebook, FaYoutube, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>© Civil Engineering Society</p>
      <div className="footer-links">
        <a href="mailto:society@college.edu" className="social-icon"><FaEnvelope /></a>
        <a href="#" className="social-icon"><FaInstagram /></a>
        <a href="#" className="social-icon"><FaLinkedin /></a>
        <a href="#" className="social-icon"><FaFacebook /></a>
        <a href="#" className="social-icon"><FaYoutube /></a>
      </div>
    </footer>
  );
}

export default Footer;
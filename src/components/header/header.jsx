import './header.css';
import HelmetHero from '../helmet/HelmetHero';
import { NavLink, Link } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <img src="/logo.png" alt="failed to load" className="header-logo" />
        <div className='header-text'>
          <div>civil engineering society</div>
          <div>NIT warangal</div>
        </div>
      </div>

      <div className="header-middle">
        {/* reserved for later  search, */}
      </div>

      <div className="header-right">
        <nav className="header-nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/team">Team</NavLink>
          <NavLink to="/join">Join us</NavLink>
        </nav>
        <div className="header-helmet" aria-hidden="true">
          <HelmetHero />
        </div>
      </div>
    </header>
  );
}

export default Header;
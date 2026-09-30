import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import './header.css';
import HelmetHero from '../helmet/HelmetHero';

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  // close the menu whenever the page changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // shadow after scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="header-left">
        <img src="/logo.png" alt="Society logo" className="header-logo" />
        <div className="header-text">
          <div>civil engineering society</div>
          <div>NIT warangal</div>
        </div>
      </Link>

      <div className="header-middle">
        {/* reserved for later  search, */}
      </div>

      <div className="header-right">
        <nav className={`header-nav ${open ? 'open' : ''}`}>
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

        <button
          className="nav-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
}

export default Header;
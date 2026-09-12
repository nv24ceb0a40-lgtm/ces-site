import './Header.css';

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
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/events">Events</a>
          <a href="/team">Team</a>
          <a href="/join">Join us</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
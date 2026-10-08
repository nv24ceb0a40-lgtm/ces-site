import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useEvents from '../../hooks/useEvents';
import useSettings from '../../hooks/useSettings';
import { joinDefaults } from '../../data/settings';
import './HomeBody.css';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function HomeBody() {
  useDocumentTitle();
  const { events } = useEvents();
  const join = useSettings('join', joinDefaults);

  // the next upcoming event, soonest first
  const spotlight = useMemo(
    () =>
      events
        .filter((e) => e.status === 'upcoming')
        .sort((a, b) => new Date(a.date) - new Date(b.date))[0],
    [events]
  );

  return (
    <main className="home-body">
      <div className="hero">
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src="/hero-loop.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay">
          <h1>Civil Engineering Society</h1>
          <p>NIT Warangal</p>
          <Link to="/about" className="hero-btn">About Us</Link>
        </div>
      </div>

      <section className="quick-links">
        <Link to="/about" className="quick-link-card">
          <h3>About</h3>
          <p>Who we are and what we do</p>
        </Link>
        <Link to="/events" className="quick-link-card">
          <h3>Events</h3>
          <p>Workshops, site visits, and talks</p>
        </Link>
        <Link to="/team" className="quick-link-card">
          <h3>Team</h3>
          <p>Meet the people running the society</p>
        </Link>
        <Link to="/join" className="quick-link-card">
          <h3>Join us</h3>
          <p>{join.badge}</p>
        </Link>
      </section>

      {spotlight && (
        <section className="event-spotlight">
          <div className="event-details">
            <div className="event-tags">
              <span className="event-tag">● Upcoming Event</span>
              <span className="event-date-tag">{formatDate(spotlight.date)}</span>
            </div>
            <h2>{spotlight.title}</h2>
            <p className="event-subtitle">{spotlight.shortDesc}</p>
            {spotlight.quote && (
              <blockquote className="event-quote">“{spotlight.quote}”</blockquote>
            )}
            <p className="event-desc">{spotlight.longDesc}</p>
            {spotlight.closingLine && (
              <p className="event-closing">{spotlight.closingLine}</p>
            )}
          </div>
          {spotlight.coverImage && (
            <div className="event-image">
              <img src={spotlight.coverImage} alt={spotlight.title} />
            </div>
          )}
        </section>
      )}
    </main>
  );
}

export default HomeBody;
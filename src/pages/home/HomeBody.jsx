import './HomeBody.css';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
function HomeBody() {
  useDocumentTitle();
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
        <a href="/about" className="quick-link-card">
          <h3>About</h3>
          <p>Who we are and what we do</p>
        </a>
        <a href="/events" className="quick-link-card">
          <h3>Events</h3>
          <p>Workshops, site visits, and talks</p>
        </a>
        <a href="/team" className="quick-link-card">
          <h3>Team</h3>
          <p>Meet the people running the society</p>
        </a>
        <a href="/join" className="quick-link-card">
          <h3>Join us</h3>
          <p>Recruitment opens soon</p>
        </a>
      </section>

      <section className="event-spotlight">
        <div className="event-details">
          <div className="event-tags">
            <span className="event-tag">● Upcoming Event</span>
            <span className="event-date-tag">Date TBD</span>
          </div>
          <h2>Event title goes here</h2>
          <p className="event-subtitle">Subtitle goes here</p>
          <blockquote className="event-quote">
            "A short quote or hook line about the event goes here."
          </blockquote>
          <p className="event-desc">
            Longer description of the event goes here — what it's about, who it's for, why people should come.
          </p>
          <p className="event-closing">Closing line or call to action goes here.</p>
        </div>
        <div className="event-image">
          <img src="/inaugral-poster.jpeg" alt="Event poster" />
        </div>
      </section>
    </main>
  );
}

export default HomeBody;
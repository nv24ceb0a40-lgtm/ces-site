import { Link } from 'react-router-dom';
import Reveal from '../../components/Reveal';
import useSettings from '../../hooks/useSettings';
import { aboutDefaults } from '../../data/settings';
import './About.css';
import useDocumentTitle from '../../hooks/useDocumentTitle';

function About() {
  useDocumentTitle('About');
  const about = useSettings('about', aboutDefaults);

  return (
    <main className="about-page">
      <section className="about-hero">
        <p className="about-eyebrow">Civil Engineering Society</p>
        <h1>About Us</h1>
        <p className="about-tagline">NIT Warangal</p>
      </section>

      <Reveal as="section" className="about-section about-intro">
        <h2 className="about-section-title">Who We Are</h2>
        {about.whoWeAre.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </Reveal>

      <section className="about-section">
        <div className="about-pillars">
          {about.pillars.map((p, i) => (
            <Reveal className="about-pillar" delay={i * 120} key={p.title}>
              <h3>{p.title}</h3>
              {p.paragraphs.map((text, j) => (
                <p key={j}>{text}</p>
              ))}
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal as="section" className="about-section">
        <h2 className="about-section-title">Events We've Done</h2>
      { /* <img
          src="/events-collage.jpg"
          alt="Collage of events organised by the society"
          className="about-collage"
          loading="lazy"
        />*/}
      </Reveal>

      <Reveal as="section" className="about-stats">
        {about.stats.map((s) => (
          <div className="about-stat" key={s.label}>
            <span className="about-stat-value">{s.value}</span>
            <span className="about-stat-label">{s.label}</span>
          </div>
        ))}
      </Reveal>

      <Reveal as="section" className="about-section about-cta">
        <h2>Want to be part of it?</h2>
        <p>See what we are up to, or meet the people who run the society.</p>
        <div className="about-cta-buttons">
          <Link to="/events" className="about-btn about-btn-primary">View Events</Link>
          <Link to="/team" className="about-btn about-btn-outline">Meet the Team</Link>
        </div>
      </Reveal>
    </main>
  );
}

export default About;
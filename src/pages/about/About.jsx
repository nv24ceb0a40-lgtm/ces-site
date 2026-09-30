import { Link } from 'react-router-dom';
import Reveal from '../../components/Reveal';
import './About.css';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const pillars = [
  {
    title: 'Our Mission',
    text: 'Placeholder: what the society exists to do for civil engineering students at NIT Warangal.',
  },
  {
    title: 'Our Vision',
    text: 'Placeholder: where the society wants to take students and the department.',
  },
  {
    title: 'What We Do',
    text: 'Workshops, site visits, guest talks, and competitions that connect classroom learning to real construction and design practice.',
  },
];

const stats = [
  { value: '00+', label: 'Events a year' },
  { value: '000+', label: 'Members' },
  { value: '00', label: 'Years running' },
  { value: '00+', label: 'Industry talks' },
];

function About() {
useDocumentTitle('About');
  return (
    <main className="about-page">
      <section className="about-hero">
        <p className="about-eyebrow">Civil Engineering Society</p>
        <h1>About Us</h1>
        <p className="about-tagline">NIT Warangal</p>
      </section>

      <Reveal as="section" className="about-section about-intro">
        <h2 className="about-section-title">Who We Are</h2>
        <p>
          Placeholder: two or three sentences on the society. When it was founded, who it serves,
          and how it fits within the Department of Civil Engineering.
        </p>
        <p>
          Placeholder: one more paragraph on the culture, the students involved, and what
          members get out of it.
        </p>
      </Reveal>

      <section className="about-section">
        <div className="about-pillars">
          {pillars.map((p, i) => (
            <Reveal className="about-pillar" delay={i * 120} key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal as="section" className="about-section">
        <h2 className="about-section-title">Events We've Done</h2>
        <img
          src="/events-collage.jpg"
          alt="Collage of events organised by the society"
          className="about-collage"
          loading="lazy"
        />
      </Reveal>

      <Reveal as="section" className="about-stats">
        {stats.map((s) => (
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
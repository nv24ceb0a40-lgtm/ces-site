import { Link } from 'react-router-dom';
import Reveal from '../../components/Reveal';
import './About.css';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const pillars = [
  {
    title: 'Our Mission',
    paragraphs: [
      'To empower civil engineering students at NIT Warangal by providing a dynamic platform for technical growth, practical exposure, and professional development. The society exists to bridge academic learning with industry standards, nurturing ethical, skilled, and industry-ready engineers.',
      'Through interactive engagement, peer collaboration, and continuous skill enrichment, we cultivate an environment where students excel academically and professionally. We aim to build leadership, teamwork, and problem-solving abilities that prepare every member to excel in the evolving civil engineering landscape.',
    ],
  },
  {
    title: 'Our Vision',
    paragraphs: [
      "To propel NIT Warangal's civil engineering students and department toward global leadership in sustainable infrastructure, innovative research, and technological excellence. The society aspires to elevate the department into a prominent hub of civil engineering innovation and academic distinction.",
      'We envision inspiring future civil engineers to design, build, and lead sustainable, resilient infrastructure that solves pressing societal and environmental challenges. By fostering strong alumni and industry linkages, we strive to position our students at the forefront of engineering advancements worldwide.',
    ],
  },
  {
    title: 'What We Do',
    paragraphs: [
      'We organize specialized technical workshops, hands-on software training, site visits, expert guest talks, and design competitions that bridge classroom concepts with real-world engineering applications. These activities give students practical exposure to modern construction practices and structural design methodologies.',
      'Additionally, we host alumni interaction sessions, national-level technical events, project showcases, and mentorship programs. Through these initiatives, members build vital industry networks, practical problem-solving capabilities, and teamwork skills essential for impactful engineering careers.',
    ],
  },
];

// TODO: replace with real numbers before launch
const stats = [
  { value: '003+', label: 'Events This year' },
  { value: '60', label: 'Members' },
  { value: '67+', label: 'Years running' },
  { value: '00+', label: 'Placement talks' },
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
          The Civil Engineering Society is the student body of the Department of Civil
          Engineering at NIT Warangal. It brings together students from every year to learn
          beyond the classroom, work on technical projects, and organise events for the
          department.
        </p>
        <p>
          Run by students, for students, the society is a place to build skills, meet seniors
          and industry professionals, and take on responsibility. Members leave with practical
          experience, a strong network, and the confidence to lead.
        </p>
      </Reveal>

      <section className="about-section">
        <div className="about-pillars">
          {pillars.map((p, i) => (
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
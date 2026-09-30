import { Link } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import './Join.css';

const perks = [
  'Workshops and hands-on sessions',
  'Site visits and industry exposure',
  'Guest talks and competitions',
  'A network across batches',
];

export default function Join() {
useDocumentTitle('Join Us');
  return (
    <main className="join-page">
      <section className="join-hero">
        <p className="join-eyebrow">Civil Engineering Society</p>
        <h1>Join Us</h1>
        <span className="join-badge">Recruitment opens soon</span>
      </section>

      <section className="join-body">
        <h2 className="join-title">Why join</h2>
        <ul className="join-perks">
          {perks.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>

        <div className="join-cta">
          <p>Want to be told when recruitment opens?</p>
          <a
            className="join-btn"
            href="mailto:nitwarangal.cea@gmail.com?subject=Recruitment%20updates"
          >
            Email us
          </a>
          <Link to="/" className="join-link">Back to home</Link>
        </div>
      </section>
    </main>
  );
}
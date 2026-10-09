import { useState } from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useSettings from '../../hooks/useSettings';
import { joinDefaults, contactDefaults } from '../../data/settings';
import { submitJoin } from '../../services/api';
import './Join.css';

const YEARS = ['1st year', '2nd year', '3rd year', '4th year', 'Other'];

function ApplyForm() {
  const [form, setForm] = useState({
    name: '',
    rollNo: '',
    email: '',
    year: YEARS[0],
    message: '',
    website: '', // honeypot: real people never see or fill this
  });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const bind = (name) => ({
    value: form[name],
    onChange: (e) => setForm({ ...form, [name]: e.target.value }),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.website) {
      setDone(true); // a bot filled the hidden field: pretend it worked
      return;
    }

    setBusy(true);
    try {
      await submitJoin({
        name: form.name.trim(),
        rollNo: form.rollNo.trim(),
        email: form.email.trim(),
        year: form.year,
        message: form.message.trim(),
      });
      setDone(true);
    } catch (err) {
      console.error(err);
      setError('Could not submit. Please try again in a moment.');
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="join-cta">
        <p>Thanks! Your application has been received. We will get in touch soon.</p>
      </div>
    );
  }

  return (
    <form className="join-form" onSubmit={handleSubmit}>
      <label>
        Full name
        <input type="text" required maxLength={99} {...bind('name')} />
      </label>
      <label>
        Roll number
        <input type="text" required maxLength={29} {...bind('rollNo')} />
      </label>
      <label>
        Email
        <input type="email" required maxLength={99} {...bind('email')} />
      </label>
      <label>
        Year
        <select {...bind('year')}>
          {YEARS.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </label>
      <label>
        Why do you want to join? (optional)
        <textarea rows="4" maxLength={999} {...bind('message')} />
      </label>

      <input
        type="text"
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px' }}
        {...bind('website')}
      />

      {error && <p className="join-form-error">{error}</p>}
      <button type="submit" className="join-btn" disabled={busy}>
        {busy ? 'Submitting…' : 'Apply'}
      </button>
    </form>
  );
}

export default function Join() {
  useDocumentTitle('Join Us');
  const join = useSettings('join', joinDefaults);
  const contact = useSettings('contact', contactDefaults);


  return (
    <main className="join-page">
      <section className="join-hero">
        <p className="join-eyebrow">Civil Engineering Society</p>
        <h1>Join Us</h1>
        <span className="join-badge">{join.badge}</span>
      </section>

      <section className="join-body">
        <h2 className="join-title">Why join</h2>
        <ul className="join-perks">
          {join.perks.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>

        {join.isOpen ? (
          <ApplyForm />
        ) : (
          <div className="join-cta">
            <p>{join.ctaText}</p>
            <a
              className="join-btn"
              href={`mailto:${contact.email}?subject=Recruitment%20updates`}
            >
              Email us
            </a>
          </div>
        )}

        <div className="join-cta">
          <Link to="/" className="join-link">Back to home</Link>
        </div>
      </section>
    </main>
  );
}
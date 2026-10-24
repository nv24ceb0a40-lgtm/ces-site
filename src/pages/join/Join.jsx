import { useState } from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useSettings from '../../hooks/useSettings';
import { joinDefaults, contactDefaults } from '../../data/settings';
import { submitJoin } from '../../services/api';
import './Join.css';

function getOptions(text) {
  const parts = (text || '').split(',');
  const out = [];
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i].trim();
    if (p) out.push(p);
  }
  return out;
}

function ApplyForm({ fields }) {
  const makeInitial = () => {
    const obj = { website: '' }; // website = honeypot
    for (let i = 0; i < fields.length; i++) {
      const f = fields[i];
      obj[f.id] = f.type === 'select' ? getOptions(f.options)[0] || '' : '';
    }
    return obj;
  };

  const [form, setForm] = useState(makeInitial);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const setValue = (id, value) => {
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.website) {
      setDone(true); // bot filled the hidden field: pretend it worked
      return;
    }

    const answers = [];
    let name = '';
    let email = '';
    for (let i = 0; i < fields.length; i++) {
      const f = fields[i];
      const value = String(form[f.id] || '').trim();
      answers.push({ label: f.label, value: value });
      if (f.id === 'name') name = value;
      if (f.id === 'email') email = value;
    }

    setBusy(true);
    try {
      await submitJoin({ name: name, email: email, answers: answers });
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
      {fields.map((f) => (
        <label key={f.id}>
          {f.label}
          {f.required ? '' : ' (optional)'}
          {f.type === 'textarea' ? (
            <textarea
              rows="4"
              required={f.required}
              maxLength={999}
              value={form[f.id] || ''}
              onChange={(e) => setValue(f.id, e.target.value)}
            />
          ) : f.type === 'select' ? (
            <select
              required={f.required}
              value={form[f.id] || ''}
              onChange={(e) => setValue(f.id, e.target.value)}
            >
              {getOptions(f.options).map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          ) : (
            <input
              type={f.type}
              required={f.required}
              maxLength={199}
              value={form[f.id] || ''}
              onChange={(e) => setValue(f.id, e.target.value)}
            />
          )}
        </label>
      ))}

      <input
        type="text"
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px' }}
        value={form.website}
        onChange={(e) => setValue('website', e.target.value)}
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

  const fields =
    join.fields && join.fields.length > 0 ? join.fields : joinDefaults.fields;

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
          <ApplyForm key={fields.length} fields={fields} />
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
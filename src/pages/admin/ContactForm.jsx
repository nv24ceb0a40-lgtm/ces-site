import { useState } from 'react';
import { useSaver } from './useSaver';

export default function ContactForm({ initial }) {
  const { busy, status, save } = useSaver('contact');
  const [form, setForm] = useState({
    email: initial.email || '',
    instagram: initial.instagram || '',
    linkedin: initial.linkedin || '',
    facebook: initial.facebook || '',
  });

  const bind = (name) => ({
    value: form[name],
    onChange: (e) => setForm({ ...form, [name]: e.target.value }),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    save({
      email: form.email.trim(),
      instagram: form.instagram.trim(),
      linkedin: form.linkedin.trim(),
      facebook: form.facebook.trim(),
    });
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <p className="admin-muted">
        These appear in the site footer and on the Join page. Leave a field empty to hide that icon.
      </p>
      <label>
        Email
        <input type="email" {...bind('email')} />
      </label>
      <label>
        Instagram URL
        <input type="url" {...bind('instagram')} />
      </label>
      <label>
        LinkedIn URL
        <input type="url" {...bind('linkedin')} />
      </label>
      <label>
        Facebook URL
        <input type="url" {...bind('facebook')} />
      </label>

      {status.text && (
        <p className={status.type === 'ok' ? 'admin-success' : 'admin-error'}>{status.text}</p>
      )}
      <div className="admin-form-actions">
        <button type="submit" className="admin-btn" disabled={busy}>
          {busy ? 'Saving…' : 'Save contact details'}
        </button>
      </div>
    </form>
  );
}
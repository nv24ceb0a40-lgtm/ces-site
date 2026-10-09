import { useState } from 'react';
import ImageField from './ImageField';

export default function TeamForm({ member, sections, onSave, onCancel }) {
  const isNew = !member.id;
  const [form, setForm] = useState({
    name: member.name || '',
    section: member.sectionTitle || sections[0]?.title || '__new',
    newTitle: '',
    newRole: '',
    role: member.role || '',
    photo: member.photo || '',
    email: member.email || '',
    linkedin: member.linkedin || '',
    instagram: member.instagram || '',
  });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const bind = (name) => ({
    value: form[name],
    onChange: (e) => setForm({ ...form, [name]: e.target.value }),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await onSave(form);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Save failed.');
      setBusy(false);
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h2>{isNew ? 'Add member' : 'Edit member'}</h2>

      <label>
        Name
        <input type="text" required {...bind('name')} />
      </label>

      <ImageField
        label="Photo (optional, initials are shown without one)"
        value={form.photo}
        onChange={(v) => setForm((f) => ({ ...f, photo: v }))}
        folder="team"
      />

      <label>
        Section
        <select {...bind('section')}>
          {sections.map((s) => (
            <option key={s.title} value={s.title}>{s.title}</option>
          ))}
          <option value="__new">+ New section…</option>
        </select>
      </label>

      {form.section === '__new' && (
        <div className="admin-form-row">
          <label>
            New section title
            <input type="text" placeholder="Treasurers" {...bind('newTitle')} />
          </label>
          <label>
            Role label (singular)
            <input type="text" placeholder="Treasurer" {...bind('newRole')} />
          </label>
        </div>
      )}

      <label>
        Custom role (optional, overrides the section role)
        <input type="text" placeholder="Secretary (PR)" {...bind('role')} />
      </label>

      <label>
        Email
        <input type="email" {...bind('email')} />
      </label>

      <label>
        LinkedIn URL
        <input type="url" {...bind('linkedin')} />
      </label>

      <label>
        Instagram URL
        <input type="url" {...bind('instagram')} />
      </label>

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-form-actions">
        <button type="submit" className="admin-btn" disabled={busy}>
          {busy ? 'Saving…' : 'Save'}
        </button>
        <button type="button" className="admin-btn admin-btn-ghost" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
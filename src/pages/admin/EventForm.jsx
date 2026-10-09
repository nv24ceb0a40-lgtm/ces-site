import { useState } from 'react';
import ImageField from './ImageField';
import ImageListField from './ImageListField';

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function EventForm({ event, onSave, onCancel }) {
  const isNew = !event.id;
  const [form, setForm] = useState({
    title: event.title || '',
    date: event.date || '',
    status: event.status || 'upcoming',
    tags: (event.tags || []).join(', '),
    shortDesc: event.shortDesc || '',
    longDesc: event.longDesc || '',
    quote: event.quote || '',
    closingLine: event.closingLine || '',
    coverImage: event.coverImage || '',
    images: event.images || [],
    reportUrl: event.reportUrl || '',
  });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const bind = (name) => ({
    value: form[name],
    onChange: (e) => setForm({ ...form, [name]: e.target.value }),
  });

  const slug = isNew ? slugify(form.title) : event.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!slug) {
      setError('The title needs some letters or numbers.');
      return;
    }

    const data = {
      title: form.title.trim(),
      date: form.date,
      status: form.status,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      shortDesc: form.shortDesc.trim(),
      longDesc: form.longDesc.trim(),
      coverImage: form.coverImage,
      images: form.images,
    };
    if (form.quote.trim()) data.quote = form.quote.trim();
    if (form.closingLine.trim()) data.closingLine = form.closingLine.trim();
    if (form.reportUrl.trim()) data.reportUrl = form.reportUrl.trim();

    setBusy(true);
    try {
      await onSave(slug, data, isNew);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Save failed.');
      setBusy(false);
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h2>{isNew ? 'Add event' : 'Edit event'}</h2>

      <label>
        Title
        <input type="text" required {...bind('title')} />
        <small className="admin-muted">
          ID: {slug || '—'} {!isNew && '(cannot be changed)'}
        </small>
      </label>

      <div className="admin-form-row">
        <label>
          Date
          <input type="date" required {...bind('date')} />
        </label>
        <label>
          Status
          <select {...bind('status')}>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </label>
      </div>

      <label>
        Tags (comma separated)
        <input type="text" placeholder="Workshop, Talk" {...bind('tags')} />
      </label>

      <label>
        Short description
        <input type="text" required {...bind('shortDesc')} />
      </label>

      <label>
        Long description
        <textarea rows="6" required {...bind('longDesc')} />
      </label>

      <label>
        Quote (optional, shown on the home spotlight)
        <input type="text" {...bind('quote')} />
      </label>

      <label>
        Closing line (optional, shown on the home spotlight)
        <input type="text" {...bind('closingLine')} />
      </label>

      <ImageField
        label="Cover image (event card and home spotlight)"
        value={form.coverImage}
        onChange={(v) => setForm((f) => ({ ...f, coverImage: v }))}
        folder="events"
      />

      <ImageListField
        label="Gallery images"
        value={form.images}
        onChange={(v) => setForm((f) => ({ ...f, images: v }))}
        folder="events"
      />

      <label>
        Report PDF path (optional)
        <input type="text" placeholder="/events/my-event/report.pdf" {...bind('reportUrl')} />
        <small className="admin-muted">
          PDFs are still path-based for now (file in the project's public folder).
        </small>
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
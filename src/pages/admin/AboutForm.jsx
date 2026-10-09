import { useState } from 'react';
import { useSaver } from './useSaver';

// paragraphs are separated by a blank line in the textarea
const toParas = (text) =>
  text.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);

export default function AboutForm({ initial }) {
  const { busy, status, save } = useSaver('about');
  const [who, setWho] = useState(initial.whoWeAre.join('\n\n'));
  const [pillars, setPillars] = useState(
    initial.pillars.map((p) => ({ title: p.title, text: p.paragraphs.join('\n\n') }))
  );
  const [stats, setStats] = useState(initial.stats.map((s) => ({ ...s })));

  const editPillar = (i, field, value) =>
    setPillars(pillars.map((p, j) => (j === i ? { ...p, [field]: value } : p)));
  const editStat = (i, field, value) =>
    setStats(stats.map((s, j) => (j === i ? { ...s, [field]: value } : s)));

  const handleSubmit = (e) => {
    e.preventDefault();
    save({
      whoWeAre: toParas(who),
      pillars: pillars
        .filter((p) => p.title.trim())
        .map((p) => ({ title: p.title.trim(), paragraphs: toParas(p.text) })),
      stats: stats
        .filter((s) => s.value.trim() || s.label.trim())
        .map((s) => ({ value: s.value.trim(), label: s.label.trim() })),
    });
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <label>
        Who We Are (separate paragraphs with a blank line)
        <textarea rows="8" value={who} onChange={(e) => setWho(e.target.value)} />
      </label>

      <h3>Mission, vision and similar blocks</h3>
      {pillars.map((p, i) => (
        <div className="admin-repeat" key={i}>
          <label>
            Title
            <input type="text" value={p.title} onChange={(e) => editPillar(i, 'title', e.target.value)} />
          </label>
          <label>
            Paragraphs (blank line between them)
            <textarea rows="7" value={p.text} onChange={(e) => editPillar(i, 'text', e.target.value)} />
          </label>
          <button
            type="button"
            className="admin-btn admin-btn-danger"
            onClick={() => setPillars(pillars.filter((_, j) => j !== i))}
          >
            Remove this block
          </button>
        </div>
      ))}
      <button
        type="button"
        className="admin-btn admin-btn-ghost"
        onClick={() => setPillars([...pillars, { title: '', text: '' }])}
      >
        + Add block
      </button>

      <h3>Stats</h3>
      {stats.map((s, i) => (
        <div className="admin-form-row admin-stat-row" key={i}>
          <label>
            Value
            <input type="text" value={s.value} onChange={(e) => editStat(i, 'value', e.target.value)} />
          </label>
          <label>
            Label
            <input type="text" value={s.label} onChange={(e) => editStat(i, 'label', e.target.value)} />
          </label>
          <button
            type="button"
            className="admin-btn admin-btn-danger"
            onClick={() => setStats(stats.filter((_, j) => j !== i))}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className="admin-btn admin-btn-ghost"
        onClick={() => setStats([...stats, { value: '', label: '' }])}
      >
        + Add stat
      </button>

      {status.text && (
        <p className={status.type === 'ok' ? 'admin-success' : 'admin-error'}>{status.text}</p>
      )}
      <div className="admin-form-actions">
        <button type="submit" className="admin-btn" disabled={busy}>
          {busy ? 'Saving…' : 'Save About page'}
        </button>
      </div>
    </form>
  );
}

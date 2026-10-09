import { useState } from 'react';
import { useSaver } from './useSaver';

export default function JoinForm({ initial }) {
  const { busy, status, save } = useSaver('join');
  const [isOpen, setIsOpen] = useState(Boolean(initial.isOpen));
  const [badge, setBadge] = useState(initial.badge || '');
  const [ctaText, setCtaText] = useState(initial.ctaText || '');
  const [perks, setPerks] = useState((initial.perks || []).join('\n'));

  const handleSubmit = (e) => {
    e.preventDefault();
    save({
      isOpen,
      badge: badge.trim(),
      ctaText: ctaText.trim(),
      perks: perks.split('\n').map((s) => s.trim()).filter(Boolean),
    });
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <label className="admin-check">
        <input type="checkbox" checked={isOpen} onChange={(e) => setIsOpen(e.target.checked)} />
        Recruitment is open (shows the application form on /join)
      </label>

      <label>
        Status badge (also shown on the home page "Join us" card)
        <input type="text" value={badge} onChange={(e) => setBadge(e.target.value)} />
        <small className="admin-muted">
          Update this when you switch the toggle, e.g. "Recruitment is open" or "Recruitment opens soon".
        </small>
      </label>

      <label>
        Text shown while recruitment is closed
        <input type="text" value={ctaText} onChange={(e) => setCtaText(e.target.value)} />
      </label>

      <label>
        Perks (one per line)
        <textarea rows="6" value={perks} onChange={(e) => setPerks(e.target.value)} />
      </label>

      {status.text && (
        <p className={status.type === 'ok' ? 'admin-success' : 'admin-error'}>{status.text}</p>
      )}
      <div className="admin-form-actions">
        <button type="submit" className="admin-btn" disabled={busy}>
          {busy ? 'Saving…' : 'Save Join page'}
        </button>
      </div>
    </form>
  );
}
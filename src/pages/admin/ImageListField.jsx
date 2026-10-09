import { useRef, useState } from 'react';
import { uploadImage } from '../../services/upload';

export default function ImageListField({ label, value, onChange, folder }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = '';
    if (!files.length) return;
    setBusy(true);
    setError('');
    const added = [];
    try {
      for (const file of files) {
        added.push(await uploadImage(file, folder));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      if (added.length) onChange([...value, ...added]); // keep whatever succeeded
      setBusy(false);
    }
  };

  return (
    <div className="admin-field">
      <span className="admin-field-label">{label}</span>
      <div className="admin-thumb-grid">
        {value.map((src, i) => (
          <div className="admin-thumb-item" key={src + i}>
            <img className="admin-thumb" src={src} alt="" />
            <button
              type="button"
              className="admin-thumb-remove"
              aria-label="Remove image"
              onClick={() => onChange(value.filter((_, j) => j !== i))}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="admin-form-actions">
        <button type="button" className="admin-btn admin-btn-ghost" disabled={busy} onClick={() => inputRef.current.click()}>
          {busy ? 'Uploading…' : '+ Upload images'}
        </button>
      </div>
      <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={handleFiles} />
      {error && <p className="admin-error">{error}</p>}
    </div>
  );
}
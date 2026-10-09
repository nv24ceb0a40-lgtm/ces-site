import { useRef, useState } from 'react';
import { uploadImage } from '../../services/upload';

export default function ImageField({ label, value, onChange, folder }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      onChange(await uploadImage(file, folder));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-field">
      <span className="admin-field-label">{label}</span>
      {value && <img className="admin-thumb" src={value} alt="" />}
      <div className="admin-form-actions">
        <button type="button" className="admin-btn admin-btn-ghost" disabled={busy} onClick={() => inputRef.current.click()}>
          {busy ? 'Uploading…' : value ? 'Replace image' : 'Upload image'}
        </button>
        {value && (
          <button type="button" className="admin-btn admin-btn-danger" onClick={() => onChange('')}>
            Remove
          </button>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleFile} />
      {error && <p className="admin-error">{error}</p>}
    </div>
  );
}
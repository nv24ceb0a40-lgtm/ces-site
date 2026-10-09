import { useEffect, useState } from 'react';
import { getSettings } from '../../services/api';

export default function SettingsLoader({ name, defaults, children }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    getSettings(name)
      .then((remote) => {
        if (!cancelled) setData({ ...defaults, ...remote });
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setError('Could not load this section.');
      });
    return () => {
      cancelled = true;
    };
  }, [name, defaults]);

  if (error) return <p className="admin-error">{error}</p>;
  if (!data) return <p className="admin-muted">Loading…</p>;
  return children(data);
}
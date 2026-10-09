import { useState } from 'react';
import { saveSettings } from '../../services/api';

export function useSaver(name) {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });

  const save = async (data) => {
    setBusy(true);
    setStatus({ type: '', text: '' });
    try {
      await saveSettings(name, data);
      setStatus({ type: 'ok', text: 'Saved. Refresh the public page to see it.' });
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', text: 'Save failed.' });
    } finally {
      setBusy(false);
    }
  };

  return { busy, status, save };
}
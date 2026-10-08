import { useEffect, useState } from 'react';
import { getSettings } from '../services/api';

// returns defaults immediately, then the Firestore values merged over them
export default function useSettings(name, defaults) {
  const [data, setData] = useState(defaults);

  useEffect(() => {
    let cancelled = false;
    getSettings(name)
      .then((remote) => {
        if (!cancelled && remote) setData({ ...defaults, ...remote });
      })
      .catch((err) => console.error(err));
    return () => {
      cancelled = true;
    };
  }, [name, defaults]);

  return data;
}
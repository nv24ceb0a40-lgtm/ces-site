import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return; // let the page handle its own anchor
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
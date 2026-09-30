import { useEffect } from 'react';

export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} | CES NITW`
      : 'Civil Engineering Society | NIT Warangal';
  }, [title]);
}
import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import useEvents from '../../hooks/useEvents';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import './Gallery.css';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function Gallery() {
  useDocumentTitle('Gallery');
  const { hash } = useLocation();
  const { events, loading, error } = useEvents();

  const withPhotos = useMemo(
    () => events.filter((e) => e.images?.length > 0),
    [events]
  );

  // jump to the event section when arriving from the Events modal
  // (runs again once the data has loaded, since the sections don't exist before that)
  useEffect(() => {
    if (!hash || loading) return;
    const el = document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash, loading]);

  return (
    <main className="gallery-page">
      <div className="gallery-hero">
        <p className="gallery-eyebrow">Civil Engineering Society</p>
        <h1>Gallery</h1>
      </div>

      {loading && <p style={{ textAlign: 'center', padding: '3rem 1rem' }}>Loading gallery…</p>}
      {error && <p style={{ textAlign: 'center', padding: '3rem 1rem' }}>{error}</p>}

      {withPhotos.map((event) => (
        <section className="gallery-section" id={event.id} key={event.id}>
          <h2 className="gallery-section-title">{event.title}</h2>
          <p className="gallery-section-date">{formatDate(event.date)}</p>
          <div className="gallery-grid">
            {event.images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${event.title} ${i + 1}`}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

export default Gallery;
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import events from '../../data/events';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import './Gallery.css';

const withPhotos = events.filter((e) => e.images?.length > 0);

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

  // jump to the event section when arriving from the Events modal
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash]);

  return (
    <main className="gallery-page">
      <div className="gallery-hero">
        <p className="gallery-eyebrow">Civil Engineering Society</p>
        <h1>Gallery</h1>
      </div>

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
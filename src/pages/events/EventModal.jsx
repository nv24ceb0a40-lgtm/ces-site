import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './EventsModal.css';

function EventModal({ event, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const hideBroken = (e) => {
    e.currentTarget.style.display = 'none';
  };

  const hasPhotos = event.images?.length > 0;

  return (
    <div className="event-modal-backdrop" onClick={onClose}>
      <div
        className="event-modal"
        role="dialog"
        aria-modal="true"
        aria-label={event.title}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="event-modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        {hasPhotos && (
          <div className="event-modal-images">
            {event.images.map((src, i) => (
              <img
                src={src}
                alt={`${event.title} ${i + 1}`}
                key={src}
                loading="lazy"
                onError={hideBroken}
              />
            ))}
          </div>
        )}

        <div className="event-modal-body">
          <span className="event-modal-date">
            {new Date(event.date).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
          <h2>{event.title}</h2>
          <p>{event.longDesc}</p>

          <div className="event-modal-actions">
            {event.reportUrl && (
              <a
                href={event.reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="event-modal-report-btn"
              >
                Read full report ↗
              </a>
            )}
            {hasPhotos && (
              <Link to={`/gallery#${event.id}`} className="event-modal-photos-btn">
                See photos
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventModal;
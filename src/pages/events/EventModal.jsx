import './EventsModal.css';

function EventModal({ event, onClose }) {
  return (
    <div className="event-modal-backdrop" onClick={onClose}>
      <div className="event-modal" onClick={(e) => e.stopPropagation()}>
        <button className="event-modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        <div className="event-modal-images">
          {event.images.map((src, i) => (
            <img src={src} alt={`${event.title} ${i + 1}`} key={src} />
          ))}
        </div>

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

        
            href={event.reportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="event-modal-report-btn"
          <a>
            Read full report ↗
          </a>
        </div>
      </div>
    </div>
  );
}

export default EventModal;
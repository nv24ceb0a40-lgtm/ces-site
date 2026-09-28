import events from '../../data/events';
import './Gallery.css';

function Gallery() {
  return (
    <main className="gallery-page">
      <div className="gallery-hero">
        <p className="gallery-eyebrow">Civil Engineering Society</p>
        <h1>Gallery</h1>
      </div>

      {events.map((event) => (
        <section className="gallery-section" key={event.id}>
          <h2 className="gallery-section-title">{event.title}</h2>
          <div className="gallery-grid">
            {event.images.map((src, i) => (
              <div className="gallery-item" key={src}>
                <img src={src} alt={`${event.title} ${i + 1}`} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

export default Gallery;

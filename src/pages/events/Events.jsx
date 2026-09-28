import { useState } from 'react';
import events from '../../data/events';
import EventModal from './EventModal';
import './Events.css';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function Events() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filtered = events.filter((e) => e.status === activeTab);

  return (
    <main className="events-page">
      <div className="events-hero">
        <p className="events-eyebrow">Civil Engineering Society</p>
        <h1>Events</h1>
      </div>

      <div className="events-tabs">
        <button
          className={`events-tab ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`events-tab ${activeTab === 'past' ? 'active' : ''}`}
          onClick={() => setActiveTab('past')}
        >
          Past
        </button>
      </div>

      <section className="events-grid">
        {filtered.length === 0 && (
          <p className="events-empty">No {activeTab} events right now — check back soon.</p>
        )}
        {filtered.map((event) => (
          <button className="event-card" key={event.id} onClick={() => setSelectedEvent(event)}>
            <div className="event-card-image">
              <img src={event.coverImage} alt={event.title} />
              <span className="event-card-tag">{event.tags[0]}</span>
            </div>
            <div className="event-card-body">
              <span className="event-card-date">{formatDate(event.date)}</span>
              <h3>{event.title}</h3>
              <p>{event.shortDesc}</p>
            </div>
          </button>
        ))}
      </section>

      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </main>
  );
}

export default Events;
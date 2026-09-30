import { useState, useMemo } from 'react';
import events from '../../data/events';
import EventModal from './EventModal';
import './Events.css';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'past', label: 'Past' },
];

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function Events() {
  useDocumentTitle('Events');
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filtered = useMemo(() => {
    const list = activeTab === 'all' ? [...events] : events.filter((e) => e.status === activeTab);
    return list.sort((a, b) => {
      if (a.status !== b.status) return a.status === 'upcoming' ? -1 : 1;
      return a.status === 'upcoming'
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    });
  }, [activeTab]);

  return (
    <main className="events-page">
      <div className="events-hero">
        <p className="events-eyebrow">Civil Engineering Society</p>
        <h1>Events</h1>
      </div>

      <div className="events-tabs" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={activeTab === tab.key}
            className={`events-tab tab-${tab.key} ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <section className="events-grid">
        {filtered.length === 0 && (
          <p className="events-empty">
            No {activeTab === 'all' ? '' : activeTab} events right now. Check back soon.
          </p>
        )}
        {filtered.map((event) => (
          <button
            className={`event-card status-${event.status}`}
            key={event.id}
            onClick={() => setSelectedEvent(event)}
          >
            <div className="event-card-image">
              <img
                src={event.coverImage}
                alt={event.title}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="event-card-tag">{event.tags[0]}</span>
              <span className={`event-card-status ${event.status}`}>
                {event.status === 'upcoming' ? '● Upcoming' : 'Past'}
              </span>
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
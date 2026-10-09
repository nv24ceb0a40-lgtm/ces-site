import { useEffect, useState } from 'react';
import { getEvents, getEvent, addEvent, deleteEvent } from '../../services/api';
import EventForm from './EventForm';

export default function EventsManager() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null); // null = list, {} = new event, event object = edit
  const [version, setVersion] = useState(0); // bump to reload the list

  useEffect(() => {
    let cancelled = false;
    getEvents()
      .then((data) => {
        if (!cancelled) {
          setEvents(data);
          setError('');
        }
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setError('Could not load events.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [version]);

  const handleSave = async (id, data, isNew) => {
    if (isNew && (await getEvent(id))) {
      throw new Error('An event with this title already exists. Change the title slightly.');
    }
    await addEvent(id, data);
    setEditing(null);
    setVersion((v) => v + 1);
  };

  const handleDelete = async (ev) => {
    if (!window.confirm(`Delete "${ev.title}"? This cannot be undone.`)) return;
    try {
      await deleteEvent(ev.id);
      setVersion((v) => v + 1);
    } catch (err) {
      console.error(err);
      setError('Delete failed.');
    }
  };

  if (editing) {
    return (
      <EventForm
        event={editing}
        onSave={handleSave}
        onCancel={() => setEditing(null)}
      />
    );
  }

  return (
    <div>
      <div className="admin-toolbar">
        <h2>Events</h2>
        <button className="admin-btn" onClick={() => setEditing({})}>+ Add event</button>
      </div>

      {loading && <p className="admin-muted">Loading…</p>}
      {error && <p className="admin-error">{error}</p>}
      {!loading && events.length === 0 && <p className="admin-muted">No events yet.</p>}

      <ul className="admin-list">
        {events.map((ev) => (
          <li key={ev.id} className="admin-row">
            <div className="admin-row-main">
              <strong>{ev.title}</strong>
              <span className="admin-muted">
                {ev.date} · <span className={`admin-pill ${ev.status}`}>{ev.status}</span>
              </span>
            </div>
            <div className="admin-row-actions">
              <button className="admin-btn admin-btn-ghost" onClick={() => setEditing(ev)}>Edit</button>
              <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(ev)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
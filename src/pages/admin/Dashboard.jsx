import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import EventsManager from './EventsManager';
import './Admin.css';
import TeamManager from './TeamManager';
import PagesManager from './PagesManager';
import RequestsManager from './RequestsManager';

const TABS = [
  { key: 'events', label: 'Events' },
  { key: 'team', label: 'Team' },
  { key: 'pages', label: 'Page content' },
  { key: 'requests', label: 'Join requests' },
];

export default function Dashboard() {
  useDocumentTitle('Admin');
  const { user, logout } = useAuth();
  const [tab, setTab] = useState('events');

  return (
    <main className="admin-panel">
      <header className="admin-header">
        <h1>Admin</h1>
        <div className="admin-header-right">
          <span>{user.email}</span>
          <button className="admin-btn admin-btn-ghost" onClick={logout}>Sign out</button>
        </div>
      </header>

      <nav className="admin-tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`admin-tab ${tab === t.key ? 'active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <section>
        {tab === 'events' && <EventsManager />}
        {tab === 'team' && <TeamManager />}
        {tab === 'pages' && <PagesManager />}
        {tab === 'requests' && <RequestsManager />}
      </section>
    </main>
  );
}
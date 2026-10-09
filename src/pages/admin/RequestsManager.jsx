import { useEffect, useState } from 'react';
import { getJoinRequests, deleteJoinRequest } from '../../services/api';

const fmt = (ts) => (ts?.toDate ? ts.toDate().toLocaleString('en-IN') : '');

const csvCell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;

export default function RequestsManager() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let cancelled = false;
    getJoinRequests()
      .then((data) => {
        if (!cancelled) {
          setRequests(data);
          setError('');
        }
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setError('Could not load requests.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [version]);

  const handleDelete = async (r) => {
    if (!window.confirm(`Delete the application from ${r.name}?`)) return;
    try {
      await deleteJoinRequest(r.id);
      setVersion((v) => v + 1);
    } catch (err) {
      console.error(err);
      setError('Delete failed.');
    }
  };

  const exportCsv = () => {
    const header = ['Name', 'Roll number', 'Email', 'Year', 'Message', 'Submitted'];
    const rows = requests.map((r) => [r.name, r.rollNo, r.email, r.year, r.message, fmt(r.createdAt)]);
    const csv = [header, ...rows].map((row) => row.map(csvCell).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'join-requests.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="admin-toolbar">
        <h2>Join requests <span className="admin-muted">({requests.length})</span></h2>
        <button className="admin-btn" onClick={exportCsv} disabled={requests.length === 0}>
          Export CSV
        </button>
      </div>

      {loading && <p className="admin-muted">Loading…</p>}
      {error && <p className="admin-error">{error}</p>}
      {!loading && !error && requests.length === 0 && (
        <p className="admin-muted">No applications yet.</p>
      )}

      <ul className="admin-list">
        {requests.map((r) => (
          <li key={r.id} className="admin-row">
            <div className="admin-row-main">
              <strong>{r.name}</strong>
              <span className="admin-muted">
                {r.rollNo} · {r.year} · <a href={`mailto:${r.email}`}>{r.email}</a>
              </span>
              {r.message && <span>{r.message}</span>}
              <span className="admin-muted">{fmt(r.createdAt)}</span>
            </div>
            <div className="admin-row-actions">
              <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(r)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
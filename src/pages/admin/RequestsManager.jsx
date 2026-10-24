import { useEffect, useState } from 'react';
import { getJoinRequests, deleteJoinRequest } from '../../services/api';

const fmt = (ts) => (ts?.toDate ? ts.toDate().toLocaleString('en-IN') : '');

const csvCell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;

// new submissions have r.answers, old ones have rollNo/year/message
const getAnswers = (r) => {
  if (r.answers && r.answers.length > 0) return r.answers;
  return [
    { label: 'Full name', value: r.name || '' },
    { label: 'Roll number', value: r.rollNo || '' },
    { label: 'Email', value: r.email || '' },
    { label: 'Year', value: r.year || '' },
    { label: 'Message', value: r.message || '' },
  ];
};

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
    // collect every label that appears in any submission, in order
    const labels = [];
    for (let i = 0; i < requests.length; i++) {
      const list = getAnswers(requests[i]);
      for (let j = 0; j < list.length; j++) {
        if (labels.indexOf(list[j].label) === -1) labels.push(list[j].label);
      }
    }

    const header = [...labels, 'Submitted'];
    const rows = [];
    for (let i = 0; i < requests.length; i++) {
      const list = getAnswers(requests[i]);
      const row = [];
      for (let k = 0; k < labels.length; k++) {
        let value = '';
        for (let j = 0; j < list.length; j++) {
          if (list[j].label === labels[k]) value = list[j].value;
        }
        row.push(value);
      }
      row.push(fmt(requests[i].createdAt));
      rows.push(row);
    }

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
              {r.email && (
                <span className="admin-muted">
                  <a href={`mailto:${r.email}`}>{r.email}</a>
                </span>
              )}
              {getAnswers(r).map((a, i) => {
                // name and email are already shown above
                if (a.value === r.name || a.value === r.email) return null;
                if (!a.value) return null;
                return (
                  <span key={i}>
                    <b>{a.label}:</b> {a.value}
                  </span>
                );
              })}
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
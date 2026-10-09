import { useEffect, useMemo, useState } from 'react';
import { getTeam, addMember, deleteMember, saveTeamOrder } from '../../services/api';
import TeamForm from './TeamForm';

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function TeamManager() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null); // null = list, {} = new, member = edit
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let cancelled = false;
    getTeam()
      .then((data) => {
        if (!cancelled) {
          setMembers(data);
          setError('');
        }
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setError('Could not load the team.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [version]);

  const reload = () => setVersion((v) => v + 1);

  // group the flat list into sections, in order of first appearance
  const sections = useMemo(() => {
    const out = [];
    for (const m of members) {
      let s = out.find((x) => x.title === m.sectionTitle);
      if (!s) {
        s = { title: m.sectionTitle, role: m.sectionRole, photoDir: m.photoDir, members: [] };
        out.push(s);
      }
      s.members.push(m);
    }
    return out;
  }, [members]);

  const handleSave = async (member, form) => {
    const isNew = !member.id;
    const docId = isNew ? slugify(form.name) : member.id;
    if (!docId) throw new Error('The name needs some letters.');
    if (isNew && members.some((m) => m.id === docId)) {
      throw new Error('A member with this name already exists.');
    }

    let sectionTitle, sectionRole, photoDir;
    if (form.section === '__new') {
      sectionTitle = form.newTitle.trim();
      sectionRole = form.newRole.trim();
      if (!sectionTitle || !sectionRole) {
        throw new Error('Fill in the new section title and role label.');
      }
      if (sections.some((s) => s.title.toLowerCase() === sectionTitle.toLowerCase())) {
        throw new Error('That section already exists. Pick it from the list.');
      }
      photoDir = `/team/${slugify(sectionTitle)}`;
    } else {
      const s = sections.find((x) => x.title === form.section);
      sectionTitle = s.title;
      sectionRole = s.role;
      photoDir = s.photoDir;
    }

    const sectionChanged = !isNew && member.sectionTitle !== sectionTitle;
    const needsReorder = isNew || sectionChanged;

    const data = {
      name: form.name.trim(),
      sectionTitle,
      sectionRole,
      photoDir,
      order: needsReorder ? 9999 : member.order,
    };
    if (form.role.trim()) data.role = form.role.trim();
    if (form.photo) data.photo = form.photo;
    if (form.email.trim()) data.email = form.email.trim();
    if (form.linkedin.trim()) data.linkedin = form.linkedin.trim();
    if (form.instagram.trim()) data.instagram = form.instagram.trim();

    await addMember(docId, data); // setDoc: replaces the whole document

    if (needsReorder) {
      // put the member at the end of their section, then renumber everyone
      const rest = members.filter((m) => m.id !== docId);
      let at = -1;
      rest.forEach((m, i) => {
        if (m.sectionTitle === sectionTitle) at = i;
      });
      const ids = rest.map((m) => m.id);
      ids.splice(at === -1 ? ids.length : at + 1, 0, docId);
      await saveTeamOrder(ids);
    }

    setEditing(null);
    reload();
  };

  const handleDelete = async (m) => {
    if (!window.confirm(`Remove ${m.name} from the team?`)) return;
    try {
      await deleteMember(m.id);
      reload();
    } catch (err) {
      console.error(err);
      setError('Delete failed.');
    }
  };

  const move = async (m, dir) => {
    const ids = members.map((x) => x.id);
    const sectionIds = members.filter((x) => x.sectionTitle === m.sectionTitle).map((x) => x.id);
    const otherId = sectionIds[sectionIds.indexOf(m.id) + dir];
    if (!otherId) return;
    const i = ids.indexOf(m.id);
    const j = ids.indexOf(otherId);
    [ids[i], ids[j]] = [ids[j], ids[i]];
    try {
      await saveTeamOrder(ids);
      reload();
    } catch (err) {
      console.error(err);
      setError('Could not reorder.');
    }
  };

  if (editing) {
    return (
      <TeamForm
        member={editing}
        sections={sections}
        onSave={(form) => handleSave(editing, form)}
        onCancel={() => setEditing(null)}
      />
    );
  }

  return (
    <div>
      <div className="admin-toolbar">
        <h2>Team</h2>
        <button className="admin-btn" onClick={() => setEditing({})}>+ Add member</button>
      </div>

      {loading && <p className="admin-muted">Loading…</p>}
      {error && <p className="admin-error">{error}</p>}

      {sections.map((s) => (
        <div className="admin-group" key={s.title}>
          <h3>{s.title} <span className="admin-muted">({s.members.length})</span></h3>
          <ul className="admin-list">
            {s.members.map((m, i) => (
              <li key={m.id} className="admin-row">
                <div className="admin-row-main">
                  <strong>{m.name}</strong>
                  <span className="admin-muted">{m.role || s.role}</span>
                </div>
                <div className="admin-row-actions">
                  <button
                    className="admin-btn admin-btn-ghost"
                    onClick={() => move(m, -1)}
                    disabled={i === 0}
                    aria-label={`Move ${m.name} up`}
                  >↑</button>
                  <button
                    className="admin-btn admin-btn-ghost"
                    onClick={() => move(m, 1)}
                    disabled={i === s.members.length - 1}
                    aria-label={`Move ${m.name} down`}
                  >↓</button>
                  <button className="admin-btn admin-btn-ghost" onClick={() => setEditing(m)}>Edit</button>
                  <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(m)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

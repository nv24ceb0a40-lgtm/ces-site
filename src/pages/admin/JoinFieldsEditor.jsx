const TYPES = ['text', 'email', 'textarea', 'select'];

export default function JoinFieldsEditor({ fields, onChange }) {
  const update = (i, patch) => {
    const copy = [];
    for (let k = 0; k < fields.length; k++) {
      if (k === i) copy.push({ ...fields[k], ...patch });
      else copy.push(fields[k]);
    }
    onChange(copy);
  };

  const remove = (i) => {
    const copy = [];
    for (let k = 0; k < fields.length; k++) {
      if (k !== i) copy.push(fields[k]);
    }
    onChange(copy);
  };

  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= fields.length) return;
    const copy = fields.slice();
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
    onChange(copy);
  };

  const add = () => {
    onChange([
      ...fields,
      { id: 'f' + Date.now(), label: '', type: 'text', required: false, options: '' },
    ]);
  };

  return (
    <div style={{ marginTop: 24 }}>
      <h3>Application form fields</h3>
      <p style={{ fontSize: 13, color: '#666' }}>
        These are the questions applicants see on the Join page.
      </p>

      {fields.map((f, i) => (
        <div
          key={f.id}
          style={{
            border: '1px solid #ccc',
            borderRadius: 8,
            padding: 12,
            marginBottom: 10,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            alignItems: 'center',
          }}
        >
          <input
            placeholder="Label (e.g. Full name)"
            value={f.label}
            onChange={(e) => update(i, { label: e.target.value })}
          />

          <select value={f.type} onChange={(e) => update(i, { type: e.target.value })}>
            {TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <label>
            <input
              type="checkbox"
              checked={!!f.required}
              onChange={(e) => update(i, { required: e.target.checked })}
            />
            {' '}Required
          </label>

          {f.type === 'select' && (
            <input
              placeholder="Options, comma separated"
              value={f.options}
              onChange={(e) => update(i, { options: e.target.value })}
              style={{ flexBasis: '100%' }}
            />
          )}

          <button type="button" onClick={() => move(i, -1)}>↑</button>
          <button type="button" onClick={() => move(i, 1)}>↓</button>
          <button type="button" onClick={() => remove(i)}>Delete</button>
        </div>
      ))}

      <button type="button" onClick={add}>+ Add field</button>
    </div>
  );
}
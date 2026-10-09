import { useState } from 'react';
import SettingsLoader from './SettingsLoader';
import AboutForm from './AboutForm';
import ContactForm from './ContactForm';
import JoinForm from './JoinForm';
import { aboutDefaults, contactDefaults, joinDefaults } from '../../data/settings';

const SECTIONS = [
  { key: 'about', label: 'About page', defaults: aboutDefaults, Form: AboutForm },
  { key: 'contact', label: 'Contact & footer', defaults: contactDefaults, Form: ContactForm },
  { key: 'join', label: 'Join page', defaults: joinDefaults, Form: JoinForm },
];

export default function PagesManager() {
  const [active, setActive] = useState('about');
  const section = SECTIONS.find((s) => s.key === active);

  return (
    <div>
      <div className="admin-subtabs">
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            className={`admin-subtab ${active === s.key ? 'active' : ''}`}
            onClick={() => setActive(s.key)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <SettingsLoader key={section.key} name={section.key} defaults={section.defaults}>
        {(data) => <section.Form initial={data} />}
      </SettingsLoader>
    </div>
  );
}
import { useRef, useState } from 'react';
import './Team.css';
import { FaLinkedinIn, FaInstagram, FaEnvelope } from 'react-icons/fa';
import Reveal from '../../components/Reveal';
import { teamSections } from '../../data/team';
import useDocumentTitle from '../../hooks/useDocumentTitle';

function getInitials(name) {
  const parts = name.replace('.', '').split(' ').filter(Boolean);
  const first = parts[0]?.[0] || '';
  const second = parts.length > 1 ? parts[1][0] : '';
  return (first + second).toUpperCase();
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function MemberCard({ name, role, photoDir, email, linkedin, instagram }) {
  const cardRef = useRef(null);
  const [imgFailed, setImgFailed] = useState(false);

  const handleMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;
    const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 8;

    card.style.setProperty('--rotate-x', `${rotateX}deg`);
    card.style.setProperty('--rotate-y', `${rotateY}deg`);
    card.style.setProperty('--spot-x', `${x}px`);
    card.style.setProperty('--spot-y', `${y}px`);
  };

  const handleLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--rotate-x', '0deg');
    card.style.setProperty('--rotate-y', '0deg');
  };

  const showPhoto = photoDir && !imgFailed;

  return (
    <div
      className="member-card"
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="member-card-inner">
        <div className="member-card-spotlight" />
        <div className={`member-avatar ${showPhoto ? 'has-photo' : ''}`}>
          {showPhoto ? (
            <img
              src={`${photoDir}/${slugify(name)}.jpg`}
              alt={name}
              onError={() => setImgFailed(true)}
            />
          ) : (
            getInitials(name)
          )}
        </div>
        <h3 className="member-name">{name}</h3>
        <p className="member-role">{role}</p>
        {(linkedin || instagram || email) && (
          <div className="member-socials">
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${name} on LinkedIn`}>
                <FaLinkedinIn />
              </a>
            )}
            {instagram && (
              <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label={`${name} on Instagram`}>
                <FaInstagram />
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} aria-label={`Email ${name}`}>
                <FaEnvelope />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Team() {
  useDocumentTitle('Team');
  return (
    <main className="team-page">
      <div className="team-hero">
        <img
          src="/executive-body-group.jpg"
          alt="Executive Body Group Photo"
          className="team-hero-img"
        />
        <div className="team-hero-overlay">
          <p className="team-eyebrow">Civil Engineering Society</p>
          <h1>Executive Body</h1>
          <p className="team-year">2026 &ndash; 27</p>
        </div>
      </div>
      {teamSections.map((section) => (
        <Reveal as="section" className="team-section" key={section.title}>
          <h2 className="team-section-title">{section.title}</h2>
          <div className="team-grid">
            {section.members.map((m) => (
              <MemberCard
                key={m.name}
                name={m.name}
                role={m.role || section.role}
                photoDir={section.photoDir}
                email={m.email}
                linkedin={m.linkedin}
                instagram={m.instagram}
              />
            ))}
          </div>
        </Reveal>
      ))}
    </main>
  );
}

export default Team;
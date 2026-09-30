import { useRef, useState } from 'react';
import './Team.css';
import Reveal from '../../components/Reveal';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const sections = [
  {
    title: 'General Secretaries',
    role: 'General Secretary',
    members: ['Pranav VVS', 'Tanmay Sharma'],
  },
  {
    title: 'Secretaries',
    role: 'Secretary',
    members: [
      'Shristi Singh',
      'Aryan Alok',
      'Sarah Banerjee',
      'Perka Hemanth Kumar',
      'Prateek Prasoon',
      'Pol Aditya Ravindra',
    ],
  },
  {
    title: 'Additional Secretaries',
    role: 'Additional Secretary',
    members: [
      'Velaga Meghana',
      'Allu Lalith Aditya Naidu',
      'K. Dharani',
      'Praneela',
      'Trisha Thodupunuri',
      'Anshika Singh',
    ],
  },
  {
    title: 'Joint Secretaries',
    role: 'Joint Secretary',
    members: [
      'Anushka Thakur',
      'Setu Raj',
      'Shashank G',
      'Aman Chaubey',
      'Avula Vishnu Vardhan',
      'Anubhav Paliwal',
      'Ankit Gupta',
      'Ishwari Kiran Munginwar',
      'Sudhanshu Sekhar Naik',
      'Ananda Parida',
    ],
  },
  {
    title: 'Executives',
    role: 'Executive',
    photoDir: '/team/executives',
    members: [
      'Marri Hansika',
      'M. Rishwika Reddy',
      'Anjan Rao',
      'Radhey Vardhan',
      'Vasu Singh Chouhan',
      'Ashish Biswas',
      'Ala Sai Teja Royal',
      'Jeevan Rachamalla',
      'Harsh Mishra',
      'Rohit Reddy',
      'Raghuvansh Tiwari',
      'Venkatesh Nidamanuri',
      'Tongar Anjali',
      'Aarush Kumar',
      'Srinivas Prasad Gali',
      'Ananya',
      'Mohan Priya',
      'Shlesha Shamya',
      'Tejansh Gupta',
      'Shreyesh Sanjay Baviskar',
      'Naga Sai Akhil',
    ],
  },
];

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

function MemberCard({ name, role, photoDir }) {
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
      {sections.map((section) => (
        <Reveal as="section" className="team-section" key={section.title}>
          <h2 className="team-section-title">{section.title}</h2>
          <div className="team-grid">
            {section.members.map((name) => (
              <MemberCard
                key={name}
                name={name}
                role={section.role}
                photoDir={section.photoDir}
              />
            ))}
          </div>
        </Reveal>
      ))}
    </main>
  );
}

export default Team;
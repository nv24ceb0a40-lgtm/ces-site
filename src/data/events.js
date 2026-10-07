const imgs = (dir, n) =>
  Array.from({ length: n }, (_, i) => `/events/${dir}/img${i + 1}.jpg`);

const events = [
  {
    id: 'linkedin-resume-workshop',
    title: 'LinkedIn and Resume Building Workshop',
    date: '2026-10-04',
    status: 'past',
    tags: ['Workshop'],
    shortDesc: 'Build a standout LinkedIn profile and a recruiter-ready resume.',
    longDesc:
      'A hands-on workshop on building a strong LinkedIn profile and a clean, recruiter-ready resume. Covered what recruiters look for, how to present projects and coursework, and practical tips for internship and placement applications. The slides and resume guidelines are available in the report.',
    coverImage: '',
    images: [],
    reportUrl: '/events/linkedin-resume-workshop/linkedin-resume-workshop.pdf',
  },
  {
    id: 'know-your-branch',
    title: 'Know Your Branch',
    date: '2026-09-20',
    status: 'past',
    tags: ['Orientation'],
    shortDesc: 'An introduction to civil engineering at NIT Warangal for new students.',
    longDesc:
      'An orientation session introducing students to the civil engineering branch: the curriculum, labs, specialisations, higher-study and career paths, and how the society supports learning beyond the classroom. The session closed with an open Q&A. The presentation is available in the report.',
    coverImage: '/events/know-your-branch/img1.jpg',
    images: imgs('know-your-branch', 8),
    reportUrl: '/events/know-your-branch/know-your-branch.pdf',
  },
  {
    id: 'inaugural',
    title: 'Inaugural Ceremony',
    date: '2026-09-06',
    status: 'past',
    tags: ['Ceremony'],
    shortDesc: 'The Civil Engineering Society opens its 2026–27 term.',
    longDesc:
      'The Civil Engineering Society opened its 2026–27 term with an inaugural ceremony that introduced the new executive body to students and faculty, shared the vision for the year, and previewed the workshops, talks, and competitions planned ahead.',
    coverImage: '/events/inaugural/img1.jpg',
    images: imgs('inaugural', 6),
  },
];

export default events;
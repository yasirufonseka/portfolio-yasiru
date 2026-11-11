export interface NavLink {
  label: string;
  href: string;
}

export interface Project {
  index: string;
  title: string;
  year: string;
  stack: string[];
  outcome: string;
  context: string;
  details: string[];
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface ExperienceItem {
  role: string;
  org: string;
  period: string;
  highlights: string[];
}

export interface EducationItem {
  qualification: string;
  institution: string;
  meta: string;
  note?: string;
}

export interface ProcessStep {
  title: string;
  body: string;
}

export const PROFILE = {
  name: 'Yasiru Fonseka',
  title: 'Aspiring Software Engineer | Java, Spring Boot, Angular, Node.js',
  location: 'Panadura, Sri Lanka',
  phone: '+94 76 640 9591',
  phoneHref: 'tel:+94766409591',
  email: 'yasirufonseka@yahoo.com',
  timezone: 'Asia/Colombo',
  summary:
    'BIT undergraduate at the University of Colombo School of Computing (UCSC), expected 2027, with hands-on full-stack experience across Java/Spring Boot, Angular and Node.js/Express. Built and deployed a live web application on a self-managed VPS and delivered three full-stack projects featuring secure authentication, RBAC, relational and NoSQL data modelling, and third-party API integration. Seeking a Software Developer Intern role.',
};

export const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const HERO_STATS = [
  { value: '03', label: 'Full-stack projects' },
  { value: '2027', label: 'BIT expected' },
  { value: 'VPS', label: 'Live deployment' },
];

export const PROJECTS: Project[] = [
  {
    index: '01',
    title: 'Visa Management System',
    year: '2025',
    stack: ['Angular', 'Node.js', 'Express.js', 'MySQL'],
    outcome: 'Automatically emails agents before visa expiry, replacing manual reminders and reducing missed renewals.',
    context:
      'Independently built and deployed v1 on a self-managed VPS, then extended it with a team.',
    details: [
      'Layered Express backend split into routes, controllers and data access.',
      'JWT authentication with role-based access control for Admin, User and Agent.',
      'bcrypt password hashing, password reset and email recovery flows.',
      'Relational MySQL models with foreign keys and client history.',
      'Input validation, centralised error handling, parameterised SQL, Helmet, CORS, rate limiting, logging and compression.',
    ],
  },
  {
    index: '02',
    title: 'Purchasing, Sales & Inventory Management System',
    year: '2026',
    stack: ['Spring Boot', 'Thymeleaf', 'MySQL', 'JavaScript'],
    outcome:
      'Full-stack ERP for a commercial printing company digitising purchasing, sales, inventory and quotation workflows.',
    context:
      'Modelled the operational data behind material variants, stock lots, goods received and remnant stock.',
    details: [
      'Schema covering material variants, stock lots, goods-received and remnant stock.',
      'Spring Security role-based access across the workflows.',
      'Quotation engine calculating material requirements, sheet imposition and job costs.',
      'Automated supplier price requests and quotation handling by email.',
    ],
  },
  {
    index: '03',
    title: 'Snap Cart — AI-Powered E-Commerce Platform',
    year: '2025',
    stack: ['Angular', 'Spring Boot', 'MongoDB'],
    outcome:
      'A second-hand branded clothing store with an end-to-end cart and checkout, plus a Gemini-powered fashion assistant.',
    context:
      'Built across an Angular storefront and a Spring Boot API backed by MongoDB.',
    details: [
      'Spring Security authentication for customers and sellers.',
      'End-to-end cart and checkout flow.',
      'Admin and seller product and order management.',
      'Gemini API fashion-assistant chatbot.',
    ],
  },
];

export const PROCESS: ProcessStep[] = [
  {
    title: 'Understand the workflow',
    body: 'Start from how the work actually happens — who does what, where it breaks — before choosing a screen or a table.',
  },
  {
    title: 'Model the data first',
    body: 'Relational schemas with real foreign keys, or document models for MongoDB. The data shape drives the API and the UI.',
  },
  {
    title: 'Build in layers',
    body: 'Routes, controllers and data access stay separate on the backend; typed services and components stay separate on the front end.',
  },
  {
    title: 'Secure by default',
    body: 'JWT sessions, role-based access, bcrypt hashing, parameterised SQL and validation are part of the build, not a later pass.',
  },
  {
    title: 'Ship and operate it',
    body: 'Deploy to a VPS, configure the reverse proxy and environment, then keep logging, error handling and compression in place.',
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  { title: 'Languages', items: ['Java', 'JavaScript', 'SQL', 'HTML', 'CSS'] },
  { title: 'Backend', items: ['Spring Boot', 'Spring Security', 'Node.js', 'Express.js', 'REST APIs'] },
  { title: 'Frontend', items: ['Angular', 'React', 'Thymeleaf', 'HTML5', 'CSS3'] },
  { title: 'Databases', items: ['MySQL', 'MongoDB'] },
  { title: 'Security', items: ['JWT', 'RBAC', 'bcrypt'] },
  { title: 'Tools', items: ['Git', 'GitHub', 'Postman', 'VPS deployment', 'Firebase', 'Gemini API'] },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Trainee Computer Hardware Technician',
    org: 'Right Technology Holdings (Pvt) Ltd',
    period: 'Dec 2019 — Aug 2020',
    highlights: [
      'Hardware and software fault diagnosis and upgrades.',
      'Component replacement, OS installs and peripheral setup.',
      'Routine maintenance across customer machines.',
    ],
  },
  {
    role: 'Trainee Computer Hardware Technician',
    org: 'National Water Supply and Drainage Board',
    period: 'Apr 2019 — Oct 2019',
    highlights: [
      'Network cabling and connectivity testing.',
      'Basic network troubleshooting under supervision.',
      'PC maintenance.',
    ],
  },
  {
    role: 'Data Entry Operator',
    org: 'AIA Insurance',
    period: 'Dec 2021 — Apr 2022',
    highlights: [
      'Accurate record entry.',
      'Handling confidential information.',
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    qualification: 'Bachelor of Information Technology (BIT)',
    institution: 'University of Colombo School of Computing (UCSC)',
    meta: 'Ongoing · Expected 2027',
  },
  {
    qualification: 'Higher National Diploma in Information Technology',
    institution: 'University of Colombo School of Computing (UCSC)',
    meta: 'Awarded 2026',
    note: 'GPA 2.39 / 4.00',
  },
  {
    qualification: 'Diploma in Information Technology',
    institution: 'University of Colombo School of Computing (UCSC)',
    meta: 'Awarded 2024',
    note: 'GPA 2.86 / 4.00',
  },
];

export const CERTIFICATIONS = [
  'NVQ Level 4, ICT Technician — NAITA, 2020',
  'English Language Certificate — NAITA, 2020 (Grade B)',
];

/**
 * Social profiles: confirmed by the owner.
 */
export const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/yasirufonseka' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yasiru-fonseka-3a7798287' },
];

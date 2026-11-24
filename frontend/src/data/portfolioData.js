export const profileData = {
  name: 'Salma',
  title: 'Full-Stack Developer',
  shortIntro:
    'BCA student building practical, clean, and user-focused web applications with React, Node.js, and modern JavaScript.',
  aboutParagraphs: [
    'I am a Bachelor of Computer Applications (BCA) student at Eternal University, Baru Sahib, with a strong interest in full-stack web development. I enjoy turning ideas into practical, responsive web applications while learning how frontend interfaces and backend systems work together.',
    'My focus is on writing clean, maintainable code, understanding core web fundamentals, and solving real-world problems step by step. Whether building interactive React interfaces or connecting Node.js and Express.js APIs, I approach every project as an opportunity to strengthen my engineering foundation.',
  ],
  email: 'salma25@navgurukul.org',
  location: 'Baru Sahib, Himachal Pradesh, India',
  profileImageUrl: '', // Empty until you upload your actual photo
  resumeUrl: '/images/Salma_Resume_.png', // Empty until you upload your actual resume PDF
  socials: {
    github: 'https://github.com/salma25-alt',
    linkedin: 'https://www.linkedin.com/in/salma25/',
    codechef: '', // Editable field: will activate once you add your CodeChef URL
  },
};

export const skillsData = [
  {
    category: 'Currently Using',
    description: 'Tools and languages I actively apply in daily workflows and problem-solving.',
    items: ['Python', 'Prompt Engineering'],
  },
  {
    category: 'Used in Projects',
    description: 'Core web technologies I have implemented in real hands-on applications.',
    items: ['HTML', 'CSS', 'JavaScript', 'React', 'MongoDB', 'Git & GitHub'],
  },
  {
    category: 'Currently Learning',
    description: 'Backend technologies I am actively studying and practicing.',
    items: ['Node.js', 'Express.js'],
  },
];

export const projectsData = [
  {
    id: 'students-task-manager',
    slug: 'students-task-manager',
    title: 'Students Task Manager',
    shortDescription:
      'A frontend task-management application designed to help students organize their tasks cleanly and efficiently.',
    fullDescription:
      'Students Task Manager is a focused React web application built to help students keep track of their daily academic tasks. It emphasizes simplicity, responsiveness, and straightforward task state management.',
    technologies: ['React'],
    features: [
      'Add tasks',
      'Delete tasks',
      'Mark tasks as completed',
    ],
    screenshotUrl: '/images/task.png', // Placeholder until screenshot is added
    githubUrl: 'https://github.com/salma25-alt/Assessment', // Will appear automatically once provided
    liveDemoUrl: 'https://assessment-pied-chi.vercel.app/', // Will appear automatically once provided
    isPlaceholder: false,
    statusLabel: 'Frontend Project',
  },
  {
    id: 'ask-gemini',
    slug: 'ask-gemini',
    title: 'Ask Gemini',
    shortDescription:
      'A full-stack AI-powered application connecting a web frontend interface to Google’s Gemini AI via Node.js and Express.js.',
    fullDescription:
      'Ask Gemini integrates Google’s Gemini AI model into a custom web interface. A Node.js and Express.js backend securely communicates with the Gemini SDK (@google/genai) and serves responses back to the frontend.',
    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'Node.js',
      'Express.js',
      'Gemini SDK (@google/genai)',
    ],
    features: [
      'Frontend interface for submitting prompts to Gemini AI',
      'Node.js and Express.js backend handling API requests',
      'Integration with Google Gemini SDK (@google/genai)',
    ],
    screenshotUrl: '/images/ask.png', // Placeholder until screenshot is added
    githubUrl: 'https://github.com/salma25-alt/ask_gemini',
    liveDemoUrl: 'https://askgemini-frontend.vercel.app/',
    isPlaceholder: false,
    statusLabel: 'Full-Stack AI Project',
  },
  {
    id: 'student-feedback-manager',
    slug: 'student-feedback-manager',
    title: 'Student Feedback Manager',
    shortDescription:
      'Full-stack project currently being documented. Detailed architecture, technologies, and features will be updated soon.',
    fullDescription:
      'This full-stack project is currently a placeholder. Verified features, screenshots, and technical stack details will be published after source code review.',
    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'Node.js',
      'Express.js',
      'MongoDB',
    ], // Intentionally empty — no assumptions made
    features: [], // Intentionally empty — no assumptions made
    screenshotUrl: '/images/student.png',
    githubUrl: 'https://github.com/salma25-alt/student-feedback-manager',
    liveDemoUrl: '',
    isPlaceholder: true,
    statusLabel: 'Placeholder • Details Coming Soon',
  },
];

export const educationData = [
  {
    id: 'bca-eternal-university',
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Eternal University',
    location: 'Baru Sahib, Himachal Pradesh, India',
    status: 'Pursuing',
  },
];

export const certificatesData = [
  {
    id: 'codechef-500',
    title: 'CodeChef 500-Level Certificate',
    organization: 'CodeChef',
    mode: 'Online',
    duration: '',
    highlights: [],
    certificateFileUrl: '/images/code_nova25-500 difficulty rating.png', // Placeholder until certificate file is uploaded
  },
  {
    id: 'yfs-virtual-internship-2026',
    title: 'YFS Virtual Internship Program 2026',
    organization: 'Young Founders School (YFS) and Tyroo',
    mode: 'Online',
    duration: 'June 2026 – August 2026',
    highlights: [
      'Explored the environmental impact of digital advertising.',
      'Learned about the environmental impact of AI and digital technology.',
      'Researched real-world problems and possible solutions.',
      'Created prototypes using Figma.',
      'Used Canva and Gamma for presentations.',
    ],
    certificateFileUrl: '', // Placeholder until certificate file is uploaded
  },
];

export const experienceData = [
  {
    id: 'yfs-tyroo-internship',
    role: 'Virtual Intern — YFS Virtual Internship Program 2026',
    organization: 'Young Founders School (YFS) and Tyroo',
    type: 'Practical Learning & Virtual Internship',
    mode: 'Online',
    duration: 'June 2026 – August 2026',
    points: [
      'Explored the environmental impact of digital advertising and AI technologies.',
      'Researched real-world sustainability challenges and proposed practical solutions.',
      'Designed interactive prototypes in Figma and built presentations using Canva and Gamma.',
    ],
  },
];

// Starter structure for the Blog / Learning Journey section (editable via Admin Dashboard in Phase 4)
export const blogPostsData = [
  {
    id: 'learning-journey-template',
    slug: 'building-my-full-stack-foundation',
    title: 'My Learning Journey: Connecting Frontend Interfaces to Backend APIs',
    category: 'Learning Journey',
    publishedAt: 'Template Entry • Editable via Admin',
    status: 'published',
    summary:
      'A dedicated space where I document concepts I learn in React, Node.js, Express.js, and MongoDB, along with lessons from building real projects.',
    content: [
      'This Learning Journey section is ready for your real technical notes, project reflections, and problem-solving write-ups.',
      'Once we complete the Admin Dashboard in Phase 4, you will be able to write, edit, publish, or save draft posts directly from your browser without editing any code files.',
    ],
    isTemplatePlaceholder: true,
  },
];
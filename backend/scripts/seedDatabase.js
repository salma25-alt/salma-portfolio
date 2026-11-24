import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDB } from '../src/config/db.js';
import Admin from '../src/models/Admin.js';
import Profile from '../src/models/Profile.js';
import Skill from '../src/models/Skill.js';
import Project from '../src/models/Project.js';
import Education from '../src/models/Education.js';
import Certificate from '../src/models/Certificate.js';
import Experience from '../src/models/Experience.js';
import BlogPost from '../src/models/BlogPost.js';

dotenv.config();

async function seed() {
  await connectDB();

  // 1. Seed initial Admin account (only if no admin exists yet)
  const adminEmail = process.env.ADMIN_EMAIL || 'salma25@navgurukul.org';
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || adminPassword === 'replace_with_a_strong_initial_password') {
    console.error(
      'ERROR: Please set a real ADMIN_PASSWORD in backend/.env before running the seed script.'
    );
    process.exit(1);
  }

  const existingAdmin = await Admin.findOne({ email: adminEmail.toLowerCase() });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await Admin.create({
      email: adminEmail.toLowerCase(),
      passwordHash,
    });
    console.log(`Admin account created for ${adminEmail}`);
  } else {
    console.log('Admin account already exists — skipping.');
  }

  // 2. Seed Profile
  const existingProfile = await Profile.findOne();
  if (!existingProfile) {
    await Profile.create({
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
      profileImageUrl: '',
      resumeUrl: '',
      socials: {
        github: 'https://github.com/salma25-alt',
        linkedin: 'https://www.linkedin.com/in/salma25/',
        codechef: '',
      },
    });
    console.log('Profile seeded.');
  }

  // 3. Seed Skills
  if ((await Skill.countDocuments()) === 0) {
    await Skill.insertMany([
      { name: 'Python', category: 'Currently Using', order: 1 },
      { name: 'Prompt Engineering', category: 'Currently Using', order: 2 },
      { name: 'HTML', category: 'Used in Projects', order: 1 },
      { name: 'CSS', category: 'Used in Projects', order: 2 },
      { name: 'JavaScript', category: 'Used in Projects', order: 3 },
      { name: 'React', category: 'Used in Projects', order: 4 },
      { name: 'MongoDB', category: 'Used in Projects', order: 5 },
      { name: 'Git & GitHub', category: 'Used in Projects', order: 6 },
      { name: 'Node.js', category: 'Currently Learning', order: 1 },
      { name: 'Express.js', category: 'Currently Learning', order: 2 },
    ]);
    console.log('Skills seeded.');
  }

  // 4. Seed Projects
  if ((await Project.countDocuments()) === 0) {
    await Project.insertMany([
      {
        title: 'Students Task Manager',
        slug: 'students-task-manager',
        shortDescription:
          'A frontend task-management application designed to help students organize their tasks cleanly and efficiently.',
        fullDescription:
          'Students Task Manager is a focused React web application built to help students keep track of their daily academic tasks. It emphasizes simplicity, responsiveness, and straightforward task state management.',
        technologies: ['React'],
        features: ['Add tasks', 'Delete tasks', 'Mark tasks as completed'],
        screenshotUrl: '',
        githubUrl: '',
        liveDemoUrl: '',
        isPlaceholder: false,
        statusLabel: 'Frontend Project',
        order: 1,
      },
      {
        title: 'Ask Gemini',
        slug: 'ask-gemini',
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
        screenshotUrl: '',
        githubUrl: 'https://github.com/salma25-alt/ask_gemini',
        liveDemoUrl: 'https://askgemini-frontend.vercel.app/',
        isPlaceholder: false,
        statusLabel: 'Full-Stack AI Project',
        order: 2,
      },
      {
        title: 'Student Feedback Manager',
        slug: 'student-feedback-manager',
        shortDescription:
          'Full-stack project currently being documented. Detailed architecture, technologies, and features will be updated soon.',
        fullDescription:
          'This full-stack project is currently a placeholder. Verified features, screenshots, and technical stack details will be published after source code review.',
        technologies: [],
        features: [],
        screenshotUrl: '',
        githubUrl: '',
        liveDemoUrl: '',
        isPlaceholder: true,
        statusLabel: 'Placeholder • Details Coming Soon',
        order: 3,
      },
    ]);
    console.log('Projects seeded.');
  }

  // 5. Seed Education
  if ((await Education.countDocuments()) === 0) {
    await Education.create({
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'Eternal University',
      location: 'Baru Sahib, Himachal Pradesh, India',
      statusLabel: 'Pursuing',
      order: 1,
    });
    console.log('Education seeded.');
  }

  // 6. Seed Certificates
  if ((await Certificate.countDocuments()) === 0) {
    await Certificate.insertMany([
      {
        title: 'CodeChef 500-Level Certificate',
        organization: 'CodeChef',
        mode: 'Online',
        duration: '',
        highlights: [],
        certificateFileUrl: '',
        order: 1,
      },
      {
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
        certificateFileUrl: '',
        order: 2,
      },
    ]);
    console.log('Certificates seeded.');
  }

  // 7. Seed Experience
  if ((await Experience.countDocuments()) === 0) {
    await Experience.create({
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
      order: 1,
    });
    console.log('Experience seeded.');
  }

  // 8. Seed Starter Blog Post
  if ((await BlogPost.countDocuments()) === 0) {
    await BlogPost.create({
      title: 'My Learning Journey: Connecting Frontend Interfaces to Backend APIs',
      slug: 'building-my-full-stack-foundation',
      category: 'Learning Journey',
      summary:
        'A dedicated space where I document concepts I learn in React, Node.js, Express.js, and MongoDB, along with lessons from building real projects.',
      content: [
        'This Learning Journey section is ready for your real technical notes, project reflections, and problem-solving write-ups.',
        'You can create, edit, publish, or save draft posts directly from your Admin Dashboard without touching any code files.',
      ],
      publishedAtLabel: 'Starter Entry • Editable via Admin',
      status: 'published',
    });
    console.log('Starter blog post seeded.');
  }

  console.log('Database seeding completed successfully.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});

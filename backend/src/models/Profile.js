import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, default: 'Salma' },
    title: {
      type: String,
      required: true,
      trim: true,
      default: 'Full-Stack Developer',
    },
    shortIntro: { type: String, required: true, trim: true },
    aboutParagraphs: [{ type: String, trim: true }],
    email: {
      type: String,
      required: true,
      trim: true,
      default: 'salma25@navgurukul.org',
    },
    location: {
      type: String,
      trim: true,
      default: 'Baru Sahib, Himachal Pradesh, India',
    },
    profileImageUrl: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    socials: {
      github: { type: String, default: 'https://github.com/salma25-alt' },
      linkedin: {
        type: String,
        default: 'https://www.linkedin.com/in/salma25/',
      },
      codechef: { type: String, default: '' },
    },
    siteSettings: {
      siteTitle: {
        type: String,
        default: 'Salma | Full-Stack Developer',
      },
      openToOpportunities: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model('Profile', profileSchema);

import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    fullDescription: {
      type: String,
      required: true,
      trim: true,
    },
    technologies: [{ type: String, trim: true }],
    features: [{ type: String, trim: true }],
    screenshotUrl: {
      type: String,
      default: '',
    },
    githubUrl: {
      type: String,
      default: '',
      trim: true,
    },
    liveDemoUrl: {
      type: String,
      default: '',
      trim: true,
    },
    statusLabel: {
      type: String,
      default: 'Project',
      trim: true,
    },
    isPlaceholder: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['published', 'draft'],
      default: 'published',
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);

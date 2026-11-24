import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      trim: true,
    },
    organization: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    mode: {
      type: String,
      default: '',
      trim: true,
    },
    duration: {
      type: String,
      default: '',
      trim: true,
    },
    points: [{ type: String, trim: true }],
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

export default mongoose.model('Experience', experienceSchema);

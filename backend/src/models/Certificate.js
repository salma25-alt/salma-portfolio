import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    organization: {
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
    highlights: [{ type: String, trim: true }],
    certificateFileUrl: {
      type: String,
      default: '',
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

export default mongoose.model('Certificate', certificateSchema);

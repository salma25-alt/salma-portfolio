import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Currently Using', 'Used in Projects', 'Currently Learning'],
      index: true,
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

export default mongoose.model('Skill', skillSchema);

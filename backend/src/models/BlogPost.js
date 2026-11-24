import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema(
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
    category: {
      type: String,
      required: true,
      trim: true,
      default: 'Learning Journey',
      index: true,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    content: [{ type: String, trim: true }],
    publishedAtLabel: {
      type: String,
      default: '',
      trim: true,
    },
    status: {
      type: String,
      enum: ['published', 'draft'],
      default: 'draft',
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('BlogPost', blogPostSchema);

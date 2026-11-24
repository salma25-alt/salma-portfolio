import Profile from '../models/Profile.js';
import Skill from '../models/Skill.js';
import Project from '../models/Project.js';
import Education from '../models/Education.js';
import Certificate from '../models/Certificate.js';
import Experience from '../models/Experience.js';
import BlogPost from '../models/BlogPost.js';

// GET /api/public/portfolio — Fetch all published portfolio sections in one clean call
export async function getFullPortfolio(req, res, next) {
  try {
    const [
      profile,
      skills,
      projects,
      education,
      certificates,
      experience,
      blogPosts,
    ] = await Promise.all([
      Profile.findOne().lean(),
      Skill.find({ status: 'published' }).sort({ order: 1, createdAt: 1 }).lean(),
      Project.find({ status: 'published' }).sort({ order: 1, createdAt: 1 }).lean(),
      Education.find({ status: 'published' }).sort({ order: 1, createdAt: 1 }).lean(),
      Certificate.find({ status: 'published' }).sort({ order: 1, createdAt: 1 }).lean(),
      Experience.find({ status: 'published' }).sort({ order: 1, createdAt: 1 }).lean(),
      BlogPost.find({ status: 'published' }).sort({ createdAt: -1 }).lean(),
    ]);

    res.json({
      success: true,
      data: {
        profile,
        skills,
        projects,
        education,
        certificates,
        experience,
        blogPosts,
      },
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/public/projects/:slug — Fetch single published project by slug
export async function getProjectBySlug(req, res, next) {
  try {
    const project = await Project.findOne({
      slug: req.params.slug.toLowerCase(),
      status: 'published',
    }).lean();

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
}

// GET /api/public/blogs/:slug — Fetch single published blog post by slug
export async function getBlogBySlug(req, res, next) {
  try {
    const post = await BlogPost.findOne({
      slug: req.params.slug.toLowerCase(),
      status: 'published',
    }).lean();

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found.',
      });
    }

    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
}

import cloudinary from '../config/cloudinary.js';
import Profile from '../models/Profile.js';
import Skill from '../models/Skill.js';
import Project from '../models/Project.js';
import Education from '../models/Education.js';
import Certificate from '../models/Certificate.js';
import Experience from '../models/Experience.js';
import BlogPost from '../models/BlogPost.js';
import ContactMessage from '../models/ContactMessage.js';

// GET /api/admin/overview — Dashboard summary counts
export async function getDashboardOverview(req, res, next) {
  try {
    const [
      projectsCount,
      skillsCount,
      certificatesCount,
      blogsCount,
      unreadMessagesCount,
      totalMessagesCount,
    ] = await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Certificate.countDocuments(),
      BlogPost.countDocuments(),
      ContactMessage.countDocuments({ isRead: false }),
      ContactMessage.countDocuments(),
    ]);

    res.json({
      success: true,
      data: {
        projectsCount,
        skillsCount,
        certificatesCount,
        blogsCount,
        unreadMessagesCount,
        totalMessagesCount,
      },
    });
  } catch (error) {
    next(error);
  }
}

// POST /api/admin/upload — Upload image or PDF to Cloudinary
export async function uploadAssetToCloudinary(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please attach a valid JPG, PNG, WEBP, or PDF file.',
      });
    }

    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      process.env.CLOUDINARY_CLOUD_NAME === 'your_cloud_name'
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Cloudinary credentials are not configured yet in backend/.env.',
      });
    }

    const folder = req.body.folder || 'salma-portfolio';
    const isPdf = req.file.mimetype === 'application/pdf';

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: isPdf ? 'raw' : 'image',
          use_filename: true,
          unique_filename: true,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    res.status(201).json({
      success: true,
      message: 'File uploaded successfully.',
      data: {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      },
    });
  } catch (error) {
    next(error);
  }
}

// --- PROFILE & SITE SETTINGS ---
export async function getAdminProfile(req, res, next) {
  try {
    const profile = await Profile.findOne();
    res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
}

export async function updateAdminProfile(req, res, next) {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      Object.assign(profile, req.body);
      await profile.save();
    }
    res.json({
      success: true,
      message: 'Profile & settings updated.',
      data: profile,
    });
  } catch (error) {
    next(error);
  }
}

// --- GENERIC CRUD FACTORY FOR COLLECTIONS ---
function createCrudHandlers(Model, sortObj = { order: 1, createdAt: -1 }) {
  return {
    getAll: async (req, res, next) => {
      try {
        const items = await Model.find().sort(sortObj);
        res.json({ success: true, data: items });
      } catch (error) {
        next(error);
      }
    },
    create: async (req, res, next) => {
      try {
        const created = await Model.create(req.body);
        res.status(201).json({
          success: true,
          message: 'Created successfully.',
          data: created,
        });
      } catch (error) {
        next(error);
      }
    },
    update: async (req, res, next) => {
      try {
        const updated = await Model.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true }
        );
        if (!updated) {
          return res
            .status(404)
            .json({ success: false, message: 'Item not found.' });
        }
        res.json({
          success: true,
          message: 'Updated successfully.',
          data: updated,
        });
      } catch (error) {
        next(error);
      }
    },
    remove: async (req, res, next) => {
      try {
        const deleted = await Model.findByIdAndDelete(req.params.id);
        if (!deleted) {
          return res
            .status(404)
            .json({ success: false, message: 'Item not found.' });
        }
        res.json({
          success: true,
          message: 'Deleted successfully.',
        });
      } catch (error) {
        next(error);
      }
    },
  };
}

export const projectHandlers = createCrudHandlers(Project);
export const skillHandlers = createCrudHandlers(Skill);
export const certificateHandlers = createCrudHandlers(Certificate);
export const educationHandlers = createCrudHandlers(Education);
export const experienceHandlers = createCrudHandlers(Experience);
export const blogHandlers = createCrudHandlers(BlogPost, { createdAt: -1 });

// --- CONTACT MESSAGES ---
export async function getContactMessages(req, res, next) {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (error) {
    next(error);
  }
}

export async function toggleMessageRead(req, res, next) {
  try {
    const msg = await ContactMessage.findById(req.params.id);
    if (!msg) {
      return res
        .status(404)
        .json({ success: false, message: 'Message not found.' });
    }
    msg.isRead = !msg.isRead;
    await msg.save();
    res.json({ success: true, data: msg });
  } catch (error) {
    next(error);
  }
}

export async function deleteContactMessage(req, res, next) {
  try {
    const deleted = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: 'Message not found.' });
    }
    res.json({ success: true, message: 'Message deleted.' });
  } catch (error) {
    next(error);
  }
}

import express from 'express';
import { requireAdmin } from '../middleware/authMiddleware.js';
import { uploadSingleFile } from '../middleware/uploadMiddleware.js';
import {
  getDashboardOverview,
  uploadAssetToCloudinary,
  getAdminProfile,
  updateAdminProfile,
  projectHandlers,
  skillHandlers,
  certificateHandlers,
  educationHandlers,
  experienceHandlers,
  blogHandlers,
  getContactMessages,
  toggleMessageRead,
  deleteContactMessage,
} from '../controllers/adminController.js';

const router = express.Router();

// Protect every route inside /api/admin
router.use(requireAdmin);

router.get('/overview', getDashboardOverview);

// File Upload
router.post('/upload', (req, res, next) => {
  uploadSingleFile(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    uploadAssetToCloudinary(req, res, next);
  });
});

// Profile & Settings
router.get('/profile', getAdminProfile);
router.put('/profile', updateAdminProfile);

// Helper to bind CRUD routes
function bindCrud(path, handlers) {
  router.get(path, handlers.getAll);
  router.post(path, handlers.create);
  router.put(`${path}/:id`, handlers.update);
  router.delete(`${path}/:id`, handlers.remove);
}

bindCrud('/projects', projectHandlers);
bindCrud('/skills', skillHandlers);
bindCrud('/certificates', certificateHandlers);
bindCrud('/education', educationHandlers);
bindCrud('/experience', experienceHandlers);
bindCrud('/blogs', blogHandlers);

// Contact Messages
router.get('/messages', getContactMessages);
router.patch('/messages/:id/read', toggleMessageRead);
router.delete('/messages/:id', deleteContactMessage);

export default router;

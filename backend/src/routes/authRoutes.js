import express from 'express';
import { body } from 'express-validator';
import {
  loginAdmin,
  logoutAdmin,
  getCurrentAdmin,
} from '../controllers/authController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';
import { authLimiter } from '../middleware/rateLimiters.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = express.Router();

router.post(
  '/login',
  authLimiter,
  [
    body('email').trim().isEmail().withMessage('Valid email is required.'),
    body('password').notEmpty().withMessage('Password is required.'),
  ],
  validateRequest,
  loginAdmin
);

router.post('/logout', logoutAdmin);
router.get('/me', requireAdmin, getCurrentAdmin);

export default router;

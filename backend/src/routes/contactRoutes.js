import express from 'express';
import { body } from 'express-validator';
import { submitContactMessage } from '../controllers/contactController.js';
import { contactLimiter } from '../middleware/rateLimiters.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = express.Router();

const contactValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters.'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Please provide a valid email address.')
    .normalizeEmail(),
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required.')
    .isLength({ max: 200 })
    .withMessage('Subject cannot exceed 200 characters.'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 3000 })
    .withMessage('Message must be between 10 and 3000 characters.'),
];

router.post(
  '/',
  contactLimiter,
  contactValidationRules,
  validateRequest,
  submitContactMessage
);

export default router;

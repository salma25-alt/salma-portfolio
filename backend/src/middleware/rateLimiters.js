import rateLimit from 'express-rate-limit';

export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // Maximum 5 contact submissions per 15 minutes per IP
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many messages sent. Please try again after 15 minutes.',
  },
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 8, // Maximum 8 login attempts per 15 minutes
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts. Please wait 15 minutes and try again.',
  },
});

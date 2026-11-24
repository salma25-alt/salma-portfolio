import express from 'express';
import {
  getFullPortfolio,
  getProjectBySlug,
  getBlogBySlug,
} from '../controllers/publicController.js';

const router = express.Router();

router.get('/portfolio', getFullPortfolio);
router.get('/projects/:slug', getProjectBySlug);
router.get('/blogs/:slug', getBlogBySlug);

export default router;

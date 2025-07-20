// Location: server/routes/experienceRoutes.js

import express from 'express';
import {
  createExperience,
  getExperiencesByCompany,
} from '../controllers/experienceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   /api/experiences

// POST / -> Create a new experience (Protected)
// We add the 'protect' middleware here to ensure only authenticated users can post.
router.route('/').post(protect, createExperience);

// GET /:companySlug -> Get all experiences for a specific company (Public)
router.route('/:companySlug').get(getExperiencesByCompany);

export default router;

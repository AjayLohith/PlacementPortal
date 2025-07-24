// Location: server/routes/experienceRoutes.js

import express from 'express';
import {
  createExperience,
  getExperiencesByCompany,
  getPendingExperiences,
  getApprovedExperiences, // Make sure this is imported
  approveExperience,
  deleteExperience,
} from '../controllers/experienceController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// --- ADMIN ROUTES ---
router.route('/admin/pending').get(protect, admin, getPendingExperiences);
router.route('/admin/approved').get(protect, admin, getApprovedExperiences); // This route is required
router.route('/admin/:id/approve').put(protect, admin, approveExperience);
router.route('/admin/:id').delete(protect, admin, deleteExperience);

// --- USER ROUTES ---
router.route('/').post(protect, createExperience);

// --- PUBLIC ROUTES ---
router.route('/:companySlug').get(getExperiencesByCompany);

export default router;

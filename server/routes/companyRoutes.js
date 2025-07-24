// Location: server/routes/companyRoutes.js

import express from 'express';
// 1. Import the getCompanies function from your controller
import { getCompanies } from '../controllers/companyController.js';

const router = express.Router();

// 2. Use the imported function to handle requests to the root path
router.route('/').get(getCompanies);

export default router;

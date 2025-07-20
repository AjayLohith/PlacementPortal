// Location: server/routes/authRoutes.js

import express from 'express';
import { registerUser, authUser } from '../controllers/authController.js';

const router = express.Router();

// Route for registering a new user
router.post('/register', registerUser);

// Route for logging in a user
router.post('/login', authUser);

export default router;

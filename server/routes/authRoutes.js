// Location: server/routes/authRoutes.js

import express from 'express';
import { 
  registerUser, 
  authUser,
  getSecurityQuestions,
  verifySecurityAnswers,
  resetPassword
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/getquestions', getSecurityQuestions);
router.post('/verifyanswers', verifySecurityAnswers);
router.put('/resetpassword', resetPassword);

export default router;

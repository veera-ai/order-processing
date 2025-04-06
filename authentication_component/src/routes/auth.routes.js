/**
 * Authentication routes
 */
import { Router } from 'express';
import {
  register,
  login,
  verifyEmail,
  requestPasswordReset,
  resetPassword
} from '../controllers/auth.controller.js';

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.get('/verify-email/:token', verifyEmail);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

export default router;

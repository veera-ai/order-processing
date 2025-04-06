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
import {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation
} from '../middleware/validation.middleware.js';

const router = Router();

// Public routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/verify-email/:token', verifyEmail);
router.post('/request-password-reset', forgotPasswordValidation, requestPasswordReset);
router.post('/reset-password', resetPasswordValidation, resetPassword);

export default router;

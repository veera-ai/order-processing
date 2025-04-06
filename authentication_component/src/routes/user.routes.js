/**
 * User routes
 */
import { Router } from 'express';
import { protect } from '../middleware/auth.middleware.js';
import {
  getProfile,
  updateProfile,
  changePassword
} from '../controllers/user.controller.js';

const router = Router();

// Protected routes - require authentication
router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/change-password', changePassword);

export default router;

import express from 'express';
import { authenticateWithToken, requireAuth, authorizeRoles } from './middleware/auth.js';
import {
  createSignup,
  getSignups,
  getSignupById,
  deleteSignup
} from '../controllers/signup.js';

const router = express.Router();

// Public route to create signup (no authentication required)
router.post('/signups/create', createSignup); 

// Admin-only route to get all signups
// Authenticate token and ensure the user is authenticated and has the 'admin' role
router.get('/signups', authenticateWithToken, requireAuth, authorizeRoles('admin'), getSignups); 

// Admin-only route to get signup by ID
// Authenticate token and ensure the user is authenticated and has the 'admin' role
router.get('/signups/:id', authenticateWithToken, requireAuth, authorizeRoles('admin'), getSignupById);

// Admin-only route to delete signup by ID
// Authenticate token and ensure the user is authenticated and has the 'admin' role
router.delete('/signups/:id', authenticateWithToken, requireAuth, authorizeRoles('admin'), deleteSignup);

export default router;

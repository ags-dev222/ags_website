import express from 'express';
import { authenticateWithToken, requireAuth, authorizeRoles } from './middleware/auth.js';
import {
  getAllResources,
  addResource,
  uploadFile,
  downloadFile,
  searchResources,
} from '../controllers/resources.js';

const router = express.Router();

// Public route to get all resources (no authentication required)
router.get('/resources', getAllResources); 

// Admin-only route to add a resource
// Authenticate token, ensure the user is authenticated, and is an admin
router.post('/resources', authenticateWithToken, requireAuth, authorizeRoles('admin'), addResource); 

// Admin-only route to upload a file
// Authenticate token, ensure the user is authenticated, and is an admin
router.post('/upload', authenticateWithToken, requireAuth, authorizeRoles('admin'), uploadFile); 

// Registered users can download files
// Authenticate token, ensure the user is authenticated, and is a registered user
router.get('/download/:id', authenticateWithToken, requireAuth, authorizeRoles('registered'), downloadFile);

// Registered users can search resources
// Authenticate token, ensure the user is authenticated, and is a registered user
router.get('/search', authenticateWithToken, requireAuth, authorizeRoles('registered'), searchResources);

export default router;

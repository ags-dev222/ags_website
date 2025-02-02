// Blog routes with Role-Based Access Control and Authentication
import express from 'express';
import { authorizeRoles, authenticateWithToken, requireAuth } from './middleware/auth.js';
import {
  createBlog,
  updateBlog,
  getAllBlogsPosts,
  getBlogById,
  deleteBlogById,
} from '../controllers/blog.js';

const router = express.Router();



// Admin only route for creating a blog post
// Authenticate token and ensure the user is an admin
router.post('/create', authenticateWithToken, requireAuth, authorizeRoles('admin'), createBlog); 

// Admin only route for updating a blog post
// Authenticate token and ensure the user is an admin
router.put('/update/:id', authenticateWithToken, requireAuth, authorizeRoles('admin'), updateBlog); 

// Public access route to get all blog posts (no authentication required)
router.get('/', getAllBlogsPosts); 

// Public access route to get a single blog post by ID (no authentication required)
router.get('/:id', getBlogById); 

// Admin only route for deleting a blog post by ID
// Authenticate token and ensure the user is an admin
router.delete('/:id', authenticateWithToken, requireAuth, authorizeRoles('admin'), deleteBlogById); 

export default router;
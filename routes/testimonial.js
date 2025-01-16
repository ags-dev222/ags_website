// Routes with Role-Based Access Control
import express from 'express';
import { 
    createTestimonial, 
    getTestimonials, 
    getTestimonialById, 
    updateTestimonial, 
    deleteTestimonial 
} from '../controllers/testimonial.js';
import { authenticateWithToken, requireAuth, authorizeRoles } from './middleware/auth.js';

const router = express.Router();



// Create a testimonial (requires authentication and role check for 'registered' users)
router.post('/testimonials/create', 
  authenticateWithToken, // Token authentication
  requireAuth,            // Ensures the user is authenticated
  authorizeRoles('registered'), // Role check for 'registered' users
  createTestimonial
);

// Get testimonials for a specific startup (requires authentication and role check for 'registered' or 'admin')
router.get('/testimonials/:startupId', 
  authenticateWithToken,  // Token authentication
  requireAuth,            // Ensures the user is authenticated
  authorizeRoles('registered', 'admin'), // Role check for 'registered' or 'admin' users
  getTestimonials
);

// Get a specific testimonial by ID (requires authentication and role check for 'registered' or 'admin')
router.get('/:id', 
  authenticateWithToken,  // Token authentication
  requireAuth,            // Ensures the user is authenticated
  authorizeRoles('registered', 'admin'), // Role check for 'registered' or 'admin' users
  getTestimonialById
);

// Update a testimonial (requires authentication and role check for 'registered' or 'admin')
router.put('/:id', 
  authenticateWithToken,  // Token authentication
  requireAuth,            // Ensures the user is authenticated
  authorizeRoles('registered', 'admin'), // Role check for 'registered' or 'admin' users
  updateTestimonial
);

// Delete a testimonial (admin only)
router.delete('/:id', 
  authenticateWithToken,  // Token authentication
  requireAuth,            // Ensures the user is authenticated
  authorizeRoles('admin'), // Role check for 'admin' only
  deleteTestimonial
);

export default router;

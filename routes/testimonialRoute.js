// Routes with Role-Based Access Control
import express from 'express';
import { 
    createTestimonial, 
    getTestimonials, 
    getTestimonialById, 
    updateTestimonial, 
    deleteTestimonial 
} from '../controllers/testimonialController.js';
import { authenticateWithToken, requireAuth, authorizeRoles } from './middleware/auth.js';

const router = express.Router();


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     Testimonial:
 *       type: object
 *       properties:
 *         startupId:
 *           type: string
 *           description: The ID of the startup associated with the testimonial
 *         userId:
 *           type: string
 *           description: The ID of the user who created the testimonial
 *         content:
 *           type: string
 *           description: Content of the testimonial
 *         rating:
 *           type: number
 *           format: float
 *           description: Rating given in the testimonial
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date when the testimonial was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date when the testimonial was last updated
 *
 *     TestimonialResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         data:
 *           $ref: '#/components/schemas/Testimonial'
 *         success:
 *           type: boolean
 *
 * security:
 *   - BearerAuth: []
 */

/**
 * @swagger
 * /api/testimonials/create:
 *   post:
 *     summary: Create a new testimonial (requires authentication and role check for 'registered' users)
 *     tags:
 *       - Testimonial
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Testimonial'
 *     responses:
 *       201:
 *         description: Testimonial created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TestimonialResponse'
 *       400:
 *         description: Bad request - Invalid data
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have the required role
 */
// Create a testimonial (requires authentication and role check for 'registered' users)
router.post('/create', 
  authenticateWithToken, // Token authentication
  requireAuth,            // Ensures the user is authenticated
  authorizeRoles('registered'), // Role check for 'registered' users
  createTestimonial
);


/**
 * @swagger
 * /api/testimonials/{startupId}:
 *   get:
 *     summary: Get testimonials for a specific startup (requires authentication and role check for 'registered' or 'admin')
 *     tags:
 *       - Testimonial
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: startupId
 *         required: true
 *         description: ID of the startup for which testimonials are fetched
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of testimonials for the startup
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Testimonial'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have the required role
 *       404:
 *         description: No testimonials found for the specified startup
 */
// Get testimonials for a specific startup (requires authentication and role check for 'registered' or 'admin')
router.get('/:startupId', 
  authenticateWithToken,  // Token authentication
  requireAuth,            // Ensures the user is authenticated
  authorizeRoles('registered', 'admin'), // Role check for 'registered' or 'admin' users
  getTestimonials
);


/**
 * @swagger
 * /api/testimonials/{id}:
 *   get:
 *     summary: Get a specific testimonial by ID (requires authentication and role check for 'registered' or 'admin')
 *     tags:
 *       - Testimonial
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the testimonial to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Testimonial retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Testimonial'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have the required role
 *       404:
 *         description: Testimonial not found
 */
// Get a specific testimonial by ID (requires authentication and role check for 'registered' or 'admin')
router.get('/:id', 
  authenticateWithToken,  // Token authentication
  requireAuth,            // Ensures the user is authenticated
  authorizeRoles('registered', 'admin'), // Role check for 'registered' or 'admin' users
  getTestimonialById
);


/**
 * @swagger
 * /api/testimonials/{id}:
 *   put:
 *     summary: Update a specific testimonial (requires authentication and role check for 'registered' or 'admin')
 *     tags:
 *       - Testimonial
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the testimonial to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Testimonial'
 *     responses:
 *       200:
 *         description: Testimonial updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TestimonialResponse'
 *       400:
 *         description: Bad request - Invalid data
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have the required role
 *       404:
 *         description: Testimonial not found
 */
// Update a testimonial (requires authentication and role check for 'registered' or 'admin')
router.put('/:id', 
  authenticateWithToken,  // Token authentication
  requireAuth,            // Ensures the user is authenticated
  authorizeRoles('registered', 'admin'), // Role check for 'registered' or 'admin' users
  updateTestimonial
);


/**
 * @swagger
 * /api/testimonials/{id}:
 *   delete:
 *     summary: Delete a specific testimonial (admin only)
 *     tags:
 *       - Testimonial
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the testimonial to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Testimonial deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TestimonialResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not an admin
 *       404:
 *         description: Testimonial not found
 */
// Delete a testimonial (admin only)
router.delete('/:id', 
  authenticateWithToken,  // Token authentication
  requireAuth,            // Ensures the user is authenticated
  authorizeRoles('admin'), // Role check for 'admin' only
  deleteTestimonial
);

export default router;
import express from 'express';
import { authenticateWithToken, requireAuth, authorizeRoles } from './middleware/auth.js';
import {
  createSignup,
  getSignups,
  getSignupById,
  deleteSignup
} from '../controllers/signupController.js';

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
 *     Signup:
 *       type: object
 *       properties:
 *         userEmail:
 *           type: string
 *           description: Email of the user who is signing up
 *         firstName:
 *           type: string
 *           description: First name of the user
 *         lastName:
 *           type: string
 *           description: Last name of the user
 *         phone:
 *           type: string
 *           description: Phone number of the user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date when the signup was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date when the signup was last updated
 *
 *     SignupResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         data:
 *           $ref: '#/components/schemas/Signup'
 *         success:
 *           type: boolean
 *
 * security:
 *   - BearerAuth: []
 */

/**
 * @swagger
 * /api/signup/create:
 *   post:
 *     summary: Create a new signup (Public access)
 *     tags:
 *       - Signup
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Signup'
 *     responses:
 *       201:
 *         description: Signup created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignupResponse'
 *       400:
 *         description: Bad request - Invalid data
 */
// Public route to create signup (no authentication required)
router.post('/create', createSignup); 

/**
 * @swagger
 * /api/signup/:
 *   get:
 *     summary: Get all signups (Admin only)
 *     tags:
 *       - Signup
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of signups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Signup'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not an admin
 *       500:
 *         description: Error retrieving signups
 */

// Admin-only route to get all signups
// Authenticate token and ensure the user is authenticated and has the 'admin' role
router.get('/', authenticateWithToken, requireAuth, authorizeRoles('admin'), getSignups); 

/**
 * @swagger
 * /api/signup/{id}:
 *   get:
 *     summary: Get signup by ID (Admin only)
 *     tags:
 *       - Signup
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the signup to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Signup data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Signup'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not an admin
 *       404:
 *         description: Signup not found
 */
// Admin-only route to get signup by ID
// Authenticate token and ensure the user is authenticated and has the 'admin' role
router.get('/:id', authenticateWithToken, requireAuth, authorizeRoles('admin'), getSignupById);


/**
 * @swagger
 * /api/signup/{id}:
 *   delete:
 *     summary: Delete signup by ID (Admin only)
 *     tags:
 *       - Signup
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the signup to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Signup deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignupResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not an admin
 *       404:
 *         description: Signup not found
 */
// Admin-only route to delete signup by ID
// Authenticate token and ensure the user is authenticated and has the 'admin' role
router.delete('/:id', authenticateWithToken, requireAuth, authorizeRoles('admin'), deleteSignup);

export default router;
import express from 'express';
import { authenticateWithToken, requireAuth, authorizeRoles } from './middleware/auth.js';
import {
  getAllResources,
  addResource,
  uploadFile,
  downloadFile,
  searchResources,
} from '../controllers/resourcesController.js';

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
 *     Resource:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the resource
 *         description:
 *           type: string
 *           description: Detailed description of the resource
 *         file:
 *           type: string
 *           description: File URL or path for the resource
 *         uploadedBy:
 *           type: string
 *           description: ID of the user who uploaded the resource (Admin only)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date when the resource was uploaded
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date when the resource was last updated
 *
 *     ResourceResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         data:
 *           $ref: '#/components/schemas/Resource'
 *         success:
 *           type: boolean
 *
 * security:
 *   - BearerAuth: []
 */

/**
 * @swagger
 * /api/resources/:
 *   get:
 *     summary: Get all resources (Public access)
 *     tags:
 *       - Resource
 *     responses:
 *       200:
 *         description: List of resources
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resource'
 *       500:
 *         description: Error retrieving resources
 */
// Public route to get all resources (no authentication required)
router.get('/', getAllResources); 


/**
 * @swagger
 * /api/resources/:
 *   post:
 *     summary: Add a new resource (Admin only)
 *     tags:
 *       - Resource
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resource'
 *     responses:
 *       201:
 *         description: Resource added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResourceResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not an admin
 */
// Admin-only route to add a resource
// Authenticate token, ensure the user is authenticated, and is an admin
router.post('/', authenticateWithToken, requireAuth, authorizeRoles('admin'), addResource); 

/**
 * @swagger
 * /api/resources/upload:
 *   post:
 *     summary: Upload a file (Admin only)
 *     tags:
 *       - Resource
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResourceResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not an admin
 */
// Admin-only route to upload a file
// Authenticate token, ensure the user is authenticated, and is an admin
router.post('/upload', authenticateWithToken, requireAuth, authorizeRoles('admin'), uploadFile); 


/**
 * @swagger
 * /api/resources/download/{id}:
 *   get:
 *     summary: Download a resource file (Registered users only)
 *     tags:
 *       - Resource
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the resource to download
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: File downloaded successfully
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not registered
 *       404:
 *         description: Resource not found
 */
// Registered users can download files
// Authenticate token, ensure the user is authenticated, and is a registered user
router.get('/download/:id', authenticateWithToken, requireAuth, authorizeRoles('registered'), downloadFile);

/**
 * @swagger
 * /api/resources/search:
 *   get:
 *     summary: Search resources (Registered users only)
 *     tags:
 *       - Resource
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         description: Search term to filter resources
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resource'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not registered
 */
// Registered users can search resources
// Authenticate token, ensure the user is authenticated, and is a registered user
router.get('/search', authenticateWithToken, requireAuth, authorizeRoles('registered'), searchResources);

export default router;
import express from 'express';
import { authenticateWithToken, requireAuth, authorizeRoles } from './middleware/auth.js';
import { 
    createStartup, 
    getAllStartups, 
    getStartupById, 
    updateStartup, 
    deleteStartup 
} from '../controllers/startupController.js';

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
 *     Startup:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the startup
 *         description:
 *           type: string
 *           description: Short description of the startup
 *         sector:
 *           type: string
 *           description: Industry sector of the startup (e.g., AgriTech, HealthTech)
 *         fundingStage:
 *           type: string
 *           description: The stage of funding (e.g., Seed, Series A)
 *         location:
 *           type: string
 *           description: Location where the startup is based
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date when the startup was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date when the startup was last updated
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *           description: Current status of the startup
 *         founders:
 *           type: array
 *           items:
 *             type: string
 *           description: Names of the founders of the startup
 *         website:
 *           type: string
 *           description: URL of the startup's website
 *         socialMedia:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               platform:
 *                 type: string
 *                 description: Name of the social media platform
 *               url:
 *                 type: string
 *                 description: URL of the social media profile
 *
 *     StartupResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         data:
 *           $ref: '#/components/schemas/Startup'
 *         success:
 *           type: boolean
 *
 * security:
 *   - BearerAuth: []
 */

/**
 * @swagger
 * /api/startups/create:
 *   post:
 *     summary: Create a new startup (requires authentication)
 *     tags:
 *       - Startup
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Startup'
 *     responses:
 *       201:
 *         description: Startup created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StartupResponse'
 *       400:
 *         description: Bad request - Invalid data
 */

// Create startup (requires authentication and role check for 'registered' or 'admin')
router.post('/create', authenticateWithToken, requireAuth, authorizeRoles('registered', 'admin'), createStartup);

/**
 * @swagger
 * /api/startups:
 *   get:
 *     summary: Get all startups (requires authentication and role check)
 *     tags:
 *       - Startup
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sector
 *         required: false
 *         description: Filter startups by sector
 *         schema:
 *           type: string
 *       - in: query
 *         name: fundingStage
 *         required: false
 *         description: Filter startups by funding stage
 *         schema:
 *           type: string
 *       - in: query
 *         name: location
 *         required: false
 *         description: Filter startups by location
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of startups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Startup'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have the required role
 *       500:
 *         description: Error retrieving startups
 */
// Get all startups (requires authentication and role check for 'registered' or 'admin')
// Can filter by sector, fundingStage, location
router.get('/', authenticateWithToken, requireAuth, authorizeRoles('registered', 'admin'), getAllStartups);

/**
 * @swagger
 * /api/startups/{id}:
 *   get:
 *     summary: Get a specific startup by ID (requires authentication)
 *     tags:
 *       - Startup
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the startup to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Startup data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Startup'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have the required role
 *       404:
 *         description: Startup not found
 */
// Get a specific startup by ID (requires authentication and role check for 'registered' or 'admin')
router.get('/:id', authenticateWithToken, requireAuth, authorizeRoles('registered', 'admin'), getStartupById);

/**
 * @swagger
 * /api/startups/{id}:
 *   put:
 *     summary: Update a specific startup by ID (requires authentication)
 *     tags:
 *       - Startup
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the startup to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Startup'
 *     responses:
 *       200:
 *         description: Startup updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StartupResponse'
 *       400:
 *         description: Bad request - Invalid data
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have the required role
 *       404:
 *         description: Startup not found
 */
// Update a specific startup by ID (requires authentication and role check for 'registered' or 'admin')
router.put('/:id', authenticateWithToken, requireAuth, authorizeRoles('registered', 'admin'), updateStartup);

/**
 * @swagger
 * /api/startups/{id}:
 *   delete:
 *     summary: Delete a specific startup by ID (admin only)
 *     tags:
 *       - Startup
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the startup to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Startup deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StartupResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not an admin
 *       404:
 *         description: Startup not found
 */
// Delete a startup (admin only)
router.delete('/:id', authenticateWithToken, requireAuth, authorizeRoles('admin'), deleteStartup);

export default router;

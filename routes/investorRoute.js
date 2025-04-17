import express from 'express';
import { authenticateWithToken, requireAuth, authorizeRoles } from './middleware/auth.js';
import {
    createInvestor,
    getInvestors ,
    getInvestorById,
    deleteInvestor,
    getDashboardMetrics,
    exportInvestors,
} from '../controllers/investorController.js'

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Investors
 *   description: Investor management and funding system
 * components:
 *   schemas:
 *     Investor:
 *       type: object
 *       required:
 *         - investorName
 *         - location
 *         - supportRound
 *         - dealSize
 *         - totalSupport
 *         - numberOfSupportedStartups
 *         - topSupportedStartups
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the investor
 *         investorName:
 *           type: string
 *         location:
 *           type: string
 *         supportRound:
 *           type: string
 *         dealSize:
 *           type: string
 *         totalSupport:
 *           type: number
 *         numberOfSupportedStartups:
 *           type: string
 *         topSupportedStartups:
 *           type: array
 *           items:
 *             type: string
 *       example:
 *         investorName: KIC
 *         location: Accra
 *         supportRound: Series A
 *         dealSize: "$500k - 1M"
 *         totalSupport: 100000000
 *         numberOfSupportedStartups: "1000 - 2000"
 *         topSupportedStartups:
 *           - My Figtech
 *           - Crop Capital
 */

/**
 * @swagger
 * /api/investors/create:
 *   post:
 *     summary: Create a new investor
 *     tags: [Investors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Investor'
 *     responses:
 *       201:
 *         description: Investor created successfully
 *       400:
 *         description: Bad request
 */
router.post('/create', createInvestor);

/**
 * @swagger
 * /api/investors:
 *   get:
 *     summary: Get all investors (with optional filters)
 *     tags: [Investors]
 *     parameters:
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter by location
 *       - in: query
 *         name: supportRound
 *         schema:
 *           type: string
 *         description: Filter by support round
 *       - in: query
 *         name: minTotalSupport
 *         schema:
 *           type: number
 *         description: Filter by minimum total support
 *       - in: query
 *         name: maxTotalSupport
 *         schema:
 *           type: number
 *         description: Filter by maximum total support
 *     responses:
 *       200:
 *         description: List of investors
 *       500:
 *         description: Server error
 */
//Only registered users and admin
router.get('/',authenticateWithToken, requireAuth, authorizeRoles('registered', 'admin', ),getInvestors);

/**
 * @swagger
 * /api/investors/metrics:
 *   get:
 *     summary: Get dashboard metrics
 *     tags: [Investors]
 *     responses:
 *       200:
 *         description: Dashboard metrics
 *       500:
 *         description: Server error
 */
//Only registered users and admin
router.get('/metrics', authenticateWithToken,requireAuth, authorizeRoles('registered', 'admin', ),getDashboardMetrics);


/**
 * @swagger
 * /api/investors/export:
 *   get:
 *     summary: Export investors data as CSV
 *     tags: [Investors]
 *     responses:
 *       200:
 *         description: CSV file download
 *       500:
 *         description: Server error
 */
//Only registered users and admin
router.get('/export', authenticateWithToken, requireAuth, authorizeRoles('registered', 'admin'), exportInvestors);

/**
 * @swagger
 * /api/investors/{id}:
 *   get:
 *     summary: Get investor by ID
 *     tags: [Investors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Investor ID
 *     responses:
 *       200:
 *         description: Investor details
 *       404:
 *         description: Investor not found
 *       500:
 *         description: Server error
 */
router.get('/:id', authenticateWithToken, requireAuth, authorizeRoles('registered', 'admin'), getInvestorById);

/**
 * @swagger
 * /api/investors/{id}:
 *   delete:
 *     summary: Delete investor by ID
 *     tags: [Investors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Investor ID
 *     responses:
 *       204:
 *         description: Investor deleted
 *       404:
 *         description: Investor not found
 *       500:
 *         description: Server error
 */
//ADMIN only to delete an investor
router.delete('/:id',  authorizeRoles('admin'), deleteInvestor);

export default router;

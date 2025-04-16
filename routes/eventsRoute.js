// Event routes with Authentication, Role-Based Access Control, and Authorization
import express from 'express';
import { authenticateWithToken, requireAuth, authorizeRoles } from './middleware/auth.js';
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
  rsvpToEvent,
} from '../controllers/eventsController.js';

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
 *     Event:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the event
 *         description:
 *           type: string
 *           description: Detailed description of the event
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date and time of the event
 *         location:
 *           type: string
 *           description: Location of the event
 *         createdBy:
 *           type: string
 *           description: ID of the user who created the event (Admin only)
 *         rsvpList:
 *           type: array
 *           items:
 *             type: string
 *             description: List of user IDs who RSVP'd to the event
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date the event was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date the event was last updated
 *
 *     EventResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         data:
 *           $ref: '#/components/schemas/Event'
 *         success:
 *           type: boolean
 *
 * security:
 *   - BearerAuth: []
 */


/**
 * @swagger
 * /api/events/:
 *   post:
 *     summary: Create a new event (Admin only)
 *     tags:
 *       - Event
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not an admin
 */

// Admin only route for creating an event
// Authenticate token, ensure the user is authenticated, and is an admin
router.post('/', authenticateWithToken, requireAuth, authorizeRoles('admin'), createEvent); 

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Update an event (Admin only)
 *     tags:
 *       - Event
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the event to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not an admin
 *       404:
 *         description: Event not found
 */
// Admin only route for updating an event
// Authenticate token, ensure the user is authenticated, and is an admin
router.put('/:id', authenticateWithToken, requireAuth, authorizeRoles('admin'), updateEvent); 


/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Delete an event (Admin only)
 *     tags:
 *       - Event
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the event to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not an admin
 *       404:
 *         description: Event not found
 */
// Admin only route for deleting an event
// Authenticate token, ensure the user is authenticated, and is an admin
router.delete('/:id', authenticateWithToken, requireAuth, authorizeRoles('admin'), deleteEvent); 

/**
 * @swagger
 * /api/events/:
 *   get:
 *     summary: Get a list of events (Public access)
 *     tags:
 *       - Event
 *     responses:
 *       200:
 *         description: List of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       500:
 *         description: Error retrieving events
 */
// Public route to get events (No authentication needed)
router.get('/', getEvents); 


/**
 * @swagger
 * /api/events/{id}/rsvp:
 *   post:
 *     summary: RSVP to an event (Registered users and Admins)
 *     tags:
 *       - Event
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the event to RSVP to
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: RSVP successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not registered or admin
 *       404:
 *         description: Event not found
 */
// Registered Users and Admins can RSVP to events
// Authenticate token, ensure the user is authenticated, and allow both registered users and admins
router.post('/:id/rsvp', authenticateWithToken, requireAuth, authorizeRoles('registered', 'admin'), rsvpToEvent); 

export default router;
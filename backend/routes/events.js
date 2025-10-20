// Event routes with Authentication, Role-Based Access Control, and Authorization
import express from 'express';
import { authenticateWithToken, requireAuth, authorizeRoles } from './middleware/auth.js';
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
  rsvpToEvent,
  getNextEvent,
  getUpcomingEvents,
  getEventById,
} from '../controllers/events.js';

const router = express.Router();



// Admin only route for creating an event
// Authenticate token, ensure the user is authenticated, and is an admin
router.post('/', authenticateWithToken, requireAuth, authorizeRoles('admin'), createEvent); 

// Admin only route for updating an event
// Authenticate token, ensure the user is authenticated, and is an admin
router.put('/:id', authenticateWithToken, requireAuth, authorizeRoles('admin'), updateEvent); 

// Admin only route for deleting an event
// Authenticate token, ensure the user is authenticated, and is an admin
router.delete('/:id', authenticateWithToken, requireAuth, authorizeRoles('admin'), deleteEvent); 

// Public route to get events (No authentication needed)
router.get('/', getEvents); 

// Public route to get next event for countdown timer
router.get('/next', getNextEvent);

// Public route to get upcoming events
router.get('/upcoming', getUpcomingEvents);

// Public route to get event by ID
router.get('/:id', getEventById);

// Registered Users and Admins can RSVP to events
// Authenticate token, ensure the user is authenticated, and allow both registered users and admins
router.post('/:id/rsvp', authenticateWithToken, requireAuth, authorizeRoles('registered', 'admin'), rsvpToEvent);

export default router;
import express from 'express';
import { requireAuth } from './middleware/auth.js';
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
  rsvpToEvent,
} from '../controllers/events.js';

const router = express.Router();

router.post('/events', requireAuth, createEvent); // Admin only
router.put('/events/:id', requireAuth, updateEvent); // Admin only
router.delete('/events/:id', requireAuth, deleteEvent); // Admin only
router.get('/events', requireAuth, getEvents); // Public (Authenticated)
router.post('/events/:id/rsvp', requireAuth, rsvpToEvent); // Registered Users

export default router;

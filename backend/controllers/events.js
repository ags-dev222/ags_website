import EventService from "../services/eventsService.js";
import { sendRSVPEmail } from "../utils/email.js";
import mongoose from 'mongoose';

// Mock event data for when database is unavailable
const mockEvents = [
  {
    _id: '1',
    title: 'Ghana SMEs Startup Week 2025',
    description: 'Join us for a week-long celebration of entrepreneurship and innovation in Ghana. Network with fellow entrepreneurs, attend workshops, and pitch your ideas.',
    date: '2025-03-15T09:00:00.000Z',
    time: '9:00 AM',
    location: 'Accra Digital Center',
    category: 'Conference',
    price: 'Free',
    featured: true,
    status: 'published',
    tags: ['entrepreneurship', 'startups', 'networking'],
    speakersCount: 12,
    expectedAttendees: 500
  },
  {
    _id: '2',
    title: 'Tech Innovation Summit',
    description: 'Exploring the future of technology in West Africa',
    date: '2025-04-20T14:00:00.000Z',
    time: '2:00 PM',
    location: 'Kumasi Tech Hub',
    category: 'Summit',
    price: 'GHS 50',
    featured: false,
    status: 'published',
    tags: ['technology', 'innovation', 'africa'],
    speakersCount: 8,
    expectedAttendees: 200
  }
];

// Check if database is connected
const isDatabaseConnected = () => {
  return mongoose.connection.readyState === 1;
};

/**
 * Create Event
 */
export const createEvent = async (req, res) => {
  try {
    const event = await EventService.create({
      ...req.body,
      organizerId: req.user._id, 
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


/**
 * Update Event
 */
export const updateEvent = async (req, res) => {
  try {
    const event = await EventService.update(req.params.id, req.body);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


/**
 * Delete Event
 */
export const deleteEvent = async (req, res) => {
  try {
    const success = await EventService.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


/**
 * Get Events
 */
export const getEvents = async (req, res) => {
  try {
    const events = await EventService.list();
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


/**
 * RSVP to Event to call sendRSVPEmail after RSVP is successful
 */
export const rsvpToEvent = async (req, res)=>{
  try{
    const event = await EventService.rsvp(req.params.id, req.user._id);

    //send reservation email after  succesfful RSVP
    await sendRSVPEmail(req.user.email, event);

    res.status(200).json({ message: 'RSVP Successful', event });
  } catch(error){
    res.status(400).json({ error: error.message });
  }
};

/**
 * Get Next Event for Countdown Timer
 */
export const getNextEvent = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      console.log('Database not connected, using mock data');
      // Return the first featured upcoming event from mock data
      const nextEvent = mockEvents.find(event => 
        event.featured && 
        event.status === 'published' && 
        new Date(event.date) > new Date()
      ) || mockEvents[0];
      return res.status(200).json(nextEvent);
    }
    
    const event = await EventService.getNextEvent();
    if (!event) {
      // Fallback to mock data if no events in database
      const nextEvent = mockEvents.find(event => 
        event.featured && 
        event.status === 'published' && 
        new Date(event.date) > new Date()
      ) || mockEvents[0];
      return res.status(200).json(nextEvent);
    }
    res.status(200).json(event);
  } catch (error) {
    console.error('Error getting next event:', error.message);
    // Fallback to mock data on error
    const nextEvent = mockEvents.find(event => 
      event.featured && 
      event.status === 'published' && 
      new Date(event.date) > new Date()
    ) || mockEvents[0];
    res.status(200).json(nextEvent);
  }
};

/**
 * Get Upcoming Events
 */
export const getUpcomingEvents = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const events = await EventService.getUpcomingEvents(limit);
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Get Event by ID
 */
export const getEventById = async (req, res) => {
  try {
    const event = await EventService.getById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

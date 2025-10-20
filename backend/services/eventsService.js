import Event from '../models/Event.js';
import User from '../models/User.js';
import mongoose from 'mongoose';
import { sendRSVPEmail } from '../utils/email.js';
import { sendPushNotification } from '../utils/pushNotifs.js';
import { sendEventPostNotification } from '../utils/email.js';

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

class EventService {
  // List all events
  static async list() {
    try {
      if (!isDatabaseConnected()) {
        console.log('Database not connected, using mock events data');
        return mockEvents;
      }
      return await Event.find().populate('organizer', 'name email');
    } catch (err) {
      console.error('Database error, falling back to mock data:', err.message);
      return mockEvents;
    }
  }

  // Get event by ID
  static async getById(id) {
    try {
      return await Event.findById(id).populate('organizer', 'name email');
    } catch (err) {
      throw new Error(`Error fetching event with ID ${id}: ${err.message}`);
    }
  }


  // Create a new event and push notification
  static async create({ title, description, date, location, organizerId, userEmail, deviceToken }) {
    if (!title) throw new Error('Title is required');
    if (!date) throw new Error('Date is required');
    if (!organizerId) throw new Error('Organizer is required');

    try {
      const event = new Event({
        title,
        description,
        date,
        location,
        organizer: organizerId,
        deviceToken, // Store deviceToken
      });

      // Save the event to the database
      await event.save();

      // Send email notification
      if (userEmail) {
        await sendEventPostNotification(userEmail, { title, description, date });
      }

      // Send push notification
      if (deviceToken) {
        await sendPushNotification(deviceToken, { title, date, description });
      }

      return event;
    } catch (err) {
      throw new Error(`Error creating event: ${err.message}`);
    }
  }

  // Update an existing event and push notification
  static async update(id, { title, description, date, location, userEmail, deviceToken }) {
    try {
      const event = await Event.findByIdAndUpdate(
        id,
        { title, description, date, location, deviceToken }, // Update deviceToken
        { new: true } // Return the updated document
      );

      if (!event) throw new Error('Event not found');

      // Send email notification
      if (userEmail) {
        await sendEventPostNotification(userEmail, { title, description, date });
      }

      // Send push notification
      if (deviceToken) {
        await sendPushNotification(deviceToken, { title, date, description });
      }

      return event;
    } catch (err) {
      throw new Error(`Error updating event with ID ${id}: ${err.message}`);
    }
  }


  // Delete an event
  static async delete(id) {
    try {
      const result = await Event.findByIdAndDelete(id);
      if (!result) throw new Error('Event not found');
      return true;
    } catch (err) {
      throw new Error(`Error deleting event with ID ${id}: ${err.message}`);
    }
  }

  // RSVP to an event
  static async rsvp(eventId, userId) {
    try {
      const event = await Event.findById(eventId);
      if (!event) throw new Error('Event not found');

      // Check if the user is already an attendee
      if (!event.attendees.includes(userId)) {
        event.attendees.push(userId);
        await event.save();

        // Notify the user via email
        const user = await User.findById(userId);
        if (user && user.email) {
          await sendRSVPEmail(user.email, event);
        }

        // Notify the user via push notification
        if (user && user.deviceToken) {
          await sendPushNotification(user.deviceToken, event);
        }
      }

      return event;
    } catch (err) {
      throw new Error(`Error RSVPing to event with ID ${eventId}: ${err.message}`);
    }
  }

  // Get next upcoming event for countdown timer
  static async getNextEvent() {
    try {
      if (!isDatabaseConnected()) {
        console.log('Database not connected, using mock next event');
        const nextEvent = mockEvents.find(event => 
          event.featured && 
          event.status === 'published' && 
          new Date(event.date) > new Date()
        ) || mockEvents[0];
        return nextEvent;
      }
      return await Event.getNextEvent();
    } catch (err) {
      console.error('Database error getting next event, falling back to mock data:', err.message);
      const nextEvent = mockEvents.find(event => 
        event.featured && 
        event.status === 'published' && 
        new Date(event.date) > new Date()
      ) || mockEvents[0];
      return nextEvent;
    }
  }

  // Get upcoming events
  static async getUpcomingEvents(limit = 10) {
    try {
      if (!isDatabaseConnected()) {
        console.log('Database not connected, using mock upcoming events');
        const upcomingEvents = mockEvents.filter(event => 
          event.status === 'published' && 
          new Date(event.date) > new Date()
        ).slice(0, limit);
        return upcomingEvents;
      }
      return await Event.getUpcomingEvents(limit);
    } catch (err) {
      console.error('Database error getting upcoming events, falling back to mock data:', err.message);
      const upcomingEvents = mockEvents.filter(event => 
        event.status === 'published' && 
        new Date(event.date) > new Date()
      ).slice(0, limit);
      return upcomingEvents;
    }
  }
}

export default EventService;
import Event from '../models/Event.js';
import User from '../models/User.js';
import { sendRSVPEmail } from '../utils/email.js';
import { sendPushNotification } from '../utils/pushNotifs.js';

class EventService {
  // List all events
  static async list() {
    try {
      return await Event.find().populate('organizer', 'name email');
    } catch (err) {
      throw new Error(`Unable to list events: ${err.message}`);
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

  // Create a new event
  static async create({ title, description, date, location, organizerId }) {
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
      });

      await event.save();
      return event;
    } catch (err) {
      throw new Error(`Error creating event: ${err.message}`);
    }
  }

  // Update an existing event
  static async update(id, data) {
    try {
      const event = await Event.findByIdAndUpdate(id, data, { new: true });
      if (!event) throw new Error('Event not found');
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
}

export default EventService;

import EventService from "../services/eventsService.js";

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
 * RSVP to Event
 */
export const rsvpToEvent = async (req, res) => {
  try {
    const event = await EventService.rsvp(req.params.id, req.user._id); 
    res.status(200).json({ message: "RSVP successful", event });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

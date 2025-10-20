import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String 
    },
    date: { 
      type: Date, 
      required: true 
    },
    time: {
      type: String,
      required: true,
      default: '12:00 PM'
    },
    location: { 
      type: String 
    },
    category: {
      type: String,
      enum: ['Conference', 'Summit', 'Meetup', 'Workshop', 'Competition', 'Webinar', 'Other'],
      default: 'Conference'
    },
    price: {
      type: String,
      default: 'Free'
    },
    maxAttendees: {
      type: Number,
      default: null // null means unlimited
    },
    image: {
      type: String,
      default: null
    },
    tags: [{
      type: String
    }],
    featured: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'cancelled', 'completed'],
      default: 'draft'
    },
    organizer: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    },
    attendees: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    }], // RSVPs
    speakersCount: {
      type: Number,
      default: 0
    },
    expectedAttendees: {
      type: Number,
      default: 0
    },
    userEmail: { 
      type: String,
      trim: true,
    },
    deviceToken: {
      type: String,
      trim: true,
    },
  },
  { 
    timestamps: true,
    // Add virtual fields
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual field to check if event is upcoming
EventSchema.virtual('isUpcoming').get(function() {
  return this.date > new Date();
});

// Virtual field to get days until event
EventSchema.virtual('daysUntil').get(function() {
  const now = new Date();
  const eventDate = new Date(this.date);
  const diffTime = eventDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
});

// Static method to get next upcoming event for countdown
EventSchema.statics.getNextEvent = function() {
  return this.findOne({
    date: { $gte: new Date() },
    status: 'published',
    featured: true
  }).sort({ date: 1 }).populate('organizer', 'name email');
};

// Static method to get all upcoming events
EventSchema.statics.getUpcomingEvents = function(limit = 10) {
  return this.find({
    date: { $gte: new Date() },
    status: 'published'
  }).sort({ date: 1 }).limit(limit).populate('organizer', 'name email');
};

export default mongoose.model('Event', EventSchema, 'events');
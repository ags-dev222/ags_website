import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema(
  {
    title: { 
    type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    location: { type: String },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // RSVPs
  },
  { timestamps: true }
);

export default mongoose.model('Event', EventSchema);

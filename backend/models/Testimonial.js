/**startupid, message, investo name, timestapm */

import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
    {
  startupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup', required: true },

  message: { type: String, required: true },

  investorName: { type: String, required: true },
  
}, { timestamps: true 

}
);

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
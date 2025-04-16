/**name, sector, fundingstage, location, achievement */
import mongoose from 'mongoose';

const startupSchema = new mongoose.Schema(
    {

  name: { type: String, required: true },

  sector: { type: String, required: true },

  fundingStage: { type: String, required: true },

  location: { type: String, required: true },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  founders: {
    type: [String],
    required: true
  },
  socialMedia: [{
    platform: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  }],
  //founded year
  //region

  foundedYear: {
    type: Number,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.+/, 'Please enter a valid URL'],
  },
  achievements: [String],

  
}, { timestamps: true

 }
);

const Startup = mongoose.model('Startup', startupSchema);


export default Startup;

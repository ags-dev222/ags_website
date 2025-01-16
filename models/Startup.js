/**name, sector, fundingstage, location, achievement */
import mongoose from 'mongoose';

const startupSchema = new mongoose.Schema(
    {

  name: { type: String, required: true },

  sector: { type: String, required: true },

  fundingStage: { type: String, required: true },

  location: { type: String, required: true },
  //founded year
  //region

  achievements: [String],
  
}, { timestamps: true

 }
);

const Startup = mongoose.model('Startup', startupSchema);


export default Startup;

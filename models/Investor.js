import mongoose from 'mongoose';

const investorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  supportRound: { type: String, enum: ['Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C', 'IPO'], required: true },
  dealSize: { type: String, required: true }, // e.g., "$500K - 1M"
  totalSupport: { type: Number, required: true }, // in dollars
  numberOfSupportedStartups: { type: String, required: true }, // e.g., "1,000 - 2,000"
  topSupportedStartups: [{ type: String }], // array of startup names
}, {
  timestamps: true,
});

const Investor = mongoose.model('Investor', investorSchema);

export default Investor;

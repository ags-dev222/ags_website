import mongoose from 'mongoose';

const signupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  industry: {
    type: String,
    required: true,
  },
  fundingStage: {
    type: String,
    required: true,
  },
  reasonForSignup: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Signup = mongoose.model('Signup', signupSchema);
export default Signup;

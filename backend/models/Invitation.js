import mongoose from 'mongoose';
import { randomUUID } from 'crypto';

const invitationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    index: true
  },
  role: {
    type: String,
    enum: ['admin', 'editor', 'registered'],
    required: true
  },
  invitedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  invitationToken: {
    type: String,
    unique: true,
    default: () => randomUUID()
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'expired'],
    default: 'pending'
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    index: { expireAfterSeconds: 0 }
  },
  inviteMessage: {
    type: String,
    maxlength: [500, 'Invitation message too long']
  },
  acceptedAt: {
    type: Date
  },
  socialLoginOptions: {
    allowGoogle: { type: Boolean, default: true },
    allowApple: { type: Boolean, default: true },
    allowLinkedIn: { type: Boolean, default: true },
    allowMicrosoft: { type: Boolean, default: true }
  }
}, {
  timestamps: true
});

// Index for efficient queries
invitationSchema.index({ email: 1, status: 1 });
invitationSchema.index({ invitationToken: 1 });

// Virtual to check if invitation is expired
invitationSchema.virtual('isExpired').get(function() {
  return this.status === 'pending' && this.expiresAt < new Date();
});

// Method to mark invitation as expired
invitationSchema.methods.markAsExpired = async function() {
  this.status = 'expired';
  await this.save();
  return this;
};

// Method to accept invitation
invitationSchema.methods.accept = async function() {
  this.status = 'accepted';
  this.acceptedAt = new Date();
  await this.save();
  return this;
};

// Static method to find valid invitation
invitationSchema.statics.findValidInvitation = async function(token) {
  const invitation = await this.findOne({
    invitationToken: token,
    status: 'pending',
    expiresAt: { $gt: new Date() }
  }).populate('invitedBy', 'name email');
  
  return invitation;
};

const Invitation = mongoose.model('Invitation', invitationSchema);

export default Invitation;

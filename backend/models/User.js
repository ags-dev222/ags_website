import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { validatePassword, isPasswordHash } from '../utils/password.js';
import { randomUUID } from 'crypto';

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    index: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator: isPasswordHash,
      message: 'Invalid password hash'
    },
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters'],
  },
  profilePicture: {
    type: String, // URL to profile picture
    default: null
  },
  // OAuth Integration
  authProvider: {
    type: String,
    enum: ['local', 'google', 'apple', 'linkedin'],
    default: 'local'
  },
  googleId: {
    type: String,
    sparse: true // Allows nulls but ensures uniqueness when present
  },
  appleId: {
    type: String,
    sparse: true
  },
  linkedinId: {
    type: String,
    sparse: true
  },
  // Email verification
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String,
    sparse: true
  },
  // Password reset
  passwordResetToken: {
    type: String,
    sparse: true
  },
  passwordResetExpiry: {
    type: Date
  },
  // Enhanced user info
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^\+?[1-9]\d{1,14}$/.test(v);
      },
      message: 'Invalid phone number format'
    }
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters']
  },
  website: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Website must be a valid URL'
    }
  },
  socialLinks: {
    linkedin: String,
    twitter: String,
    github: String
  },
  // Activity tracking
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: Date,
  
  // Role assignment system
  roleStatus: {
    type: String,
    enum: ['approved', 'pending', 'rejected'],
    default: 'approved' // registered users are auto-approved
  },
  requestedRole: {
    type: String,
    enum: ['editor', 'admin'],
    default: null
  },
  roleRequestMessage: {
    type: String,
    maxlength: [500, 'Role request message cannot exceed 500 characters']
  },
  roleRequestedAt: {
    type: Date
  },
  roleApprovedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  roleApprovedAt: {
    type: Date
  },
  // Account verification for new users
  accountStatus: {
    type: String,
    enum: ['active', 'pending_verification', 'suspended', 'deactivated'],
    default: 'active'
  },
  // User preferences
  preferences: {
    notifications: {
      email: { type: Boolean, default: true },
      roleUpdates: { type: Boolean, default: true },
      newsletter: { type: Boolean, default: false }
    },
    language: {
      type: String,
      default: 'en'
    },
    timezone: {
      type: String,
      default: 'UTC'
    }
  },
  department: {
    type: String,
    trim: true,
    maxlength: [100, 'Department name too long']
  },
  //RBAC - Enhanced Role System
  role: {
    type: String,
    enum: ['superadmin', 'admin', 'editor', 'registered', 'public'],
    default: 'registered',
    lowercase: true
  },
  permissions: {
    canManageUsers: { type: Boolean, default: false },
    canManageContent: { type: Boolean, default: false },
    canManageSettings: { type: Boolean, default: false },
    canPublishContent: { type: Boolean, default: false },
    canDeleteContent: { type: Boolean, default: false },
    canViewAnalytics: { type: Boolean, default: false }
  },

  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  lastLoginAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  token: {
    type: String,
    unique: true,
    index: true,
    default: () => randomUUID(),
  },
}, {
  versionKey: false,
});

schema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret._id;
    delete ret.password;
    return ret;
  },
});

schema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Set permissions based on role before saving
schema.pre('save', function(next) {
  if (this.isModified('role') || this.isNew) {
    switch (this.role) {
      case 'superadmin':
        this.permissions = {
          canManageUsers: true,
          canManageContent: true,
          canManageSettings: true,
          canPublishContent: true,
          canDeleteContent: true,
          canViewAnalytics: true
        };
        break;
      case 'admin':
        this.permissions = {
          canManageUsers: true,
          canManageContent: true,
          canManageSettings: false,
          canPublishContent: true,
          canDeleteContent: true,
          canViewAnalytics: true
        };
        break;
      case 'editor':
        this.permissions = {
          canManageUsers: false,
          canManageContent: true,
          canManageSettings: false,
          canPublishContent: true,
          canDeleteContent: false,
          canViewAnalytics: false
        };
        break;
      default:
        this.permissions = {
          canManageUsers: false,
          canManageContent: false,
          canManageSettings: false,
          canPublishContent: false,
          canDeleteContent: false,
          canViewAnalytics: false
        };
    }
  }
  next();
});

schema.methods.regenerateToken = async function regenerateToken() {
  this.token = randomUUID();
  if (!this.isNew) {
    await this.save();
  }
  return this;
};

schema.statics.authenticateWithPassword = async function authenticateWithPassword(email, password) {
  const user = await this.findOne({ email }).exec();
  if (!user) return null;

  const passwordValid = await validatePassword(password, user.password);
  if (!passwordValid) return null;

  user.lastLoginAt = Date.now();
  const updatedUser = await user.save();

  return updatedUser;
};


const User = mongoose.models.User || mongoose.model('User', schema, 'users');


export default User;
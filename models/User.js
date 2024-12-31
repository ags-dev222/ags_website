const mongoose = require('mongoose');
const { validatePassword, isPasswordHash } = require('../utils/password.js');
const { randomUUID } = require("crypto");

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

const User = mongoose.model('User', schema);

module.exports = User;
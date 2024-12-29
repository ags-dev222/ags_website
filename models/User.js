const mongoose = require('mongoose');
const { hashPassword } = require('../utils/password');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'public'],
    default: 'user'
  },
  name: {
    type: String,
    required: true 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
  // The token field has been removed as per instructions

});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await hashPassword(this.password);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
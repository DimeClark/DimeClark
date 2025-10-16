/**
 * User Model - MongoDB schema for user profiles
 */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  pronouns: {
    type: String,
    required: true,
  },
  genderIdentity: {
    type: String,
    required: true,
  },
  orientation: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: '',
  },
  socialLinks: {
    instagram: String,
    twitter: String,
    other: String,
  },
  verifiedLGBTQ: {
    type: Boolean,
    default: false,
  },
  badges: [{
    type: String,
    enum: ['verified', 'moderator', 'supporter', 'ally'],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
});

// Hide password when converting to JSON
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);

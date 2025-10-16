/**
 * Post Model - MongoDB schema for Spills, Sips, and Brews
 */
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['spill', 'sip', 'brew'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  authorAnonymous: {
    type: Boolean,
    default: true,
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  reviewedPerson: {
    name: String,
    platform: String, // e.g., 'Hinge', 'Tinder', 'Bumble', 'IRL'
  },
  tags: [{
    type: String,
  }],
  screenshots: [{
    url: String,
    description: String,
  }],
  likes: {
    type: Number,
    default: 0,
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  comments: [{
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    content: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  flagged: {
    type: Boolean,
    default: false,
  },
  flagReason: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
postSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Post', postSchema);

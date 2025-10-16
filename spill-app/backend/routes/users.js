/**
 * User Routes
 * Handles user profile operations
 */
const express = require('express');
const User = require('../models/User');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.toJSON());
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const updates = req.body;
    
    // Don't allow updating sensitive fields through this endpoint
    delete updates.password;
    delete updates.email;
    delete updates.verifiedLGBTQ;

    const user = await User.findByIdAndUpdate(
      req.userId,
      updates,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user: user.toJSON(),
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Search users (public)
router.get('/search', async (req, res) => {
  try {
    const { query, pronouns, city, genderIdentity } = req.query;
    
    const searchCriteria = {};
    
    if (query) {
      searchCriteria.$or = [
        { name: { $regex: query, $options: 'i' } },
      ];
    }
    
    if (pronouns) {
      searchCriteria.pronouns = { $regex: pronouns, $options: 'i' };
    }
    
    if (city) {
      searchCriteria.city = { $regex: city, $options: 'i' };
    }
    
    if (genderIdentity) {
      searchCriteria.genderIdentity = { $regex: genderIdentity, $options: 'i' };
    }

    const users = await User.find(searchCriteria)
      .select('-password')
      .limit(50);

    res.json({ users });
  } catch (error) {
    console.error('Search users error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

module.exports = router;

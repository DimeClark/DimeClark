/**
 * Post Routes
 * Handles Spills, Sips, and Brews
 */
const express = require('express');
const Post = require('../models/Post');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get all posts (feed)
router.get('/', async (req, res) => {
  try {
    const { type, tags, page = 1, limit = 20 } = req.query;
    
    const query = {};
    
    if (type) {
      query.type = type;
    }
    
    if (tags) {
      query.tags = { $in: tags.split(',') };
    }

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('author', 'name pronouns verifiedLGBTQ');

    const total = await Post.countDocuments(query);

    res.json({
      posts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: 'Failed to get posts' });
  }
});

// Create a new post
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { type, content, rating, reviewedPerson, tags, screenshots, authorAnonymous } = req.body;

    const post = new Post({
      type,
      author: req.userId,
      authorAnonymous: authorAnonymous !== undefined ? authorAnonymous : true,
      content,
      rating,
      reviewedPerson,
      tags,
      screenshots,
    });

    await post.save();

    res.status(201).json({
      message: 'Post created successfully',
      post,
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Like/unlike a post
router.post('/:id/like', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const likedIndex = post.likedBy.indexOf(req.userId);
    
    if (likedIndex > -1) {
      // Unlike
      post.likedBy.splice(likedIndex, 1);
      post.likes = Math.max(0, post.likes - 1);
    } else {
      // Like
      post.likedBy.push(req.userId);
      post.likes += 1;
    }

    await post.save();

    res.json({
      message: likedIndex > -1 ? 'Post unliked' : 'Post liked',
      likes: post.likes,
    });
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({ error: 'Failed to like post' });
  }
});

// Add comment to post
router.post('/:id/comment', authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;
    
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.comments.push({
      author: req.userId,
      content,
    });

    await post.save();

    res.status(201).json({
      message: 'Comment added',
      comment: post.comments[post.comments.length - 1],
    });
  } catch (error) {
    console.error('Comment error:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Flag a post
router.post('/:id/flag', authMiddleware, async (req, res) => {
  try {
    const { reason } = req.body;
    
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.flagged = true;
    post.flagReason = reason;
    await post.save();

    res.json({ message: 'Post flagged for review' });
  } catch (error) {
    console.error('Flag post error:', error);
    res.status(500).json({ error: 'Failed to flag post' });
  }
});

module.exports = router;

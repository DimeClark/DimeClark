/**
 * Posts Routes Tests
 * Tests for Spills, Sips, and Brews functionality
 */
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const Post = require('../models/Post');

const MONGODB_TEST_URI = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/spill-app-test';

let authToken;
let userId;

beforeAll(async () => {
  await mongoose.connect(MONGODB_TEST_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  // Clear collections
  await User.deleteMany({});
  await Post.deleteMany({});

  // Create and authenticate a test user
  const response = await request(app)
    .post('/api/auth/register')
    .send({
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      pronouns: 'they/them',
      genderIdentity: 'non-binary',
      orientation: 'queer',
      city: 'San Francisco',
    });

  authToken = response.body.token;
  userId = response.body.user._id;
});

describe('GET /api/posts', () => {
  it('should get all posts', async () => {
    // Create test posts
    await Post.create({
      type: 'spill',
      author: userId,
      content: 'Test spill content',
      rating: 4,
    });

    await Post.create({
      type: 'sip',
      author: userId,
      content: 'Test sip content',
    });

    const response = await request(app)
      .get('/api/posts');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('posts');
    expect(response.body).toHaveProperty('pagination');
    expect(response.body.posts).toHaveLength(2);
  });

  it('should filter posts by type', async () => {
    await Post.create({
      type: 'spill',
      author: userId,
      content: 'Test spill',
    });

    await Post.create({
      type: 'brew',
      author: userId,
      content: 'Test brew',
    });

    const response = await request(app)
      .get('/api/posts?type=spill');

    expect(response.status).toBe(200);
    expect(response.body.posts).toHaveLength(1);
    expect(response.body.posts[0].type).toBe('spill');
  });

  it('should filter posts by tags', async () => {
    await Post.create({
      type: 'spill',
      author: userId,
      content: 'Test post',
      tags: ['red-flag', 'hinge'],
    });

    await Post.create({
      type: 'spill',
      author: userId,
      content: 'Another test',
      tags: ['green-flag'],
    });

    const response = await request(app)
      .get('/api/posts?tags=red-flag');

    expect(response.status).toBe(200);
    expect(response.body.posts).toHaveLength(1);
    expect(response.body.posts[0].tags).toContain('red-flag');
  });

  it('should paginate results', async () => {
    // Create multiple posts
    for (let i = 0; i < 25; i++) {
      await Post.create({
        type: 'spill',
        author: userId,
        content: `Test post ${i}`,
      });
    }

    const response = await request(app)
      .get('/api/posts?page=1&limit=10');

    expect(response.status).toBe(200);
    expect(response.body.posts).toHaveLength(10);
    expect(response.body.pagination.page).toBe(1);
    expect(response.body.pagination.pages).toBe(3);
  });
});

describe('POST /api/posts', () => {
  it('should create a new spill post', async () => {
    const postData = {
      type: 'spill',
      content: 'Had a great date!',
      rating: 5,
      reviewedPerson: {
        name: 'Alex',
        platform: 'Hinge',
      },
      tags: ['green-flag', 'respectful'],
      authorAnonymous: false,
    };

    const response = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${authToken}`)
      .send(postData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('post');
    expect(response.body.post.content).toBe(postData.content);
    expect(response.body.post.type).toBe('spill');
  });

  it('should create anonymous post by default', async () => {
    const postData = {
      type: 'brew',
      content: 'Anonymous story',
    };

    const response = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${authToken}`)
      .send(postData);

    expect(response.status).toBe(201);
    expect(response.body.post.authorAnonymous).toBe(true);
  });

  it('should reject post creation without authentication', async () => {
    const postData = {
      type: 'sip',
      content: 'Test content',
    };

    const response = await request(app)
      .post('/api/posts')
      .send(postData);

    expect(response.status).toBe(401);
  });
});

describe('POST /api/posts/:id/like', () => {
  let postId;

  beforeEach(async () => {
    const post = await Post.create({
      type: 'spill',
      author: userId,
      content: 'Test post',
    });
    postId = post._id;
  });

  it('should like a post', async () => {
    const response = await request(app)
      .post(`/api/posts/${postId}/like`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toContain('liked');
    expect(response.body.likes).toBe(1);
  });

  it('should unlike a post', async () => {
    // Like the post first
    await request(app)
      .post(`/api/posts/${postId}/like`)
      .set('Authorization', `Bearer ${authToken}`);

    // Unlike the post
    const response = await request(app)
      .post(`/api/posts/${postId}/like`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toContain('unliked');
    expect(response.body.likes).toBe(0);
  });

  it('should reject like without authentication', async () => {
    const response = await request(app)
      .post(`/api/posts/${postId}/like`);

    expect(response.status).toBe(401);
  });

  it('should return 404 for non-existent post', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    
    const response = await request(app)
      .post(`/api/posts/${fakeId}/like`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(404);
  });
});

describe('POST /api/posts/:id/comment', () => {
  let postId;

  beforeEach(async () => {
    const post = await Post.create({
      type: 'spill',
      author: userId,
      content: 'Test post',
    });
    postId = post._id;
  });

  it('should add comment to post', async () => {
    const response = await request(app)
      .post(`/api/posts/${postId}/comment`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ content: 'Great review!' });

    expect(response.status).toBe(201);
    expect(response.body.message).toContain('Comment added');
    expect(response.body.comment.content).toBe('Great review!');
  });

  it('should reject comment without authentication', async () => {
    const response = await request(app)
      .post(`/api/posts/${postId}/comment`)
      .send({ content: 'Test comment' });

    expect(response.status).toBe(401);
  });

  it('should return 404 for non-existent post', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    
    const response = await request(app)
      .post(`/api/posts/${fakeId}/comment`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ content: 'Test comment' });

    expect(response.status).toBe(404);
  });
});

describe('POST /api/posts/:id/flag', () => {
  let postId;

  beforeEach(async () => {
    const post = await Post.create({
      type: 'spill',
      author: userId,
      content: 'Test post',
    });
    postId = post._id;
  });

  it('should flag a post', async () => {
    const response = await request(app)
      .post(`/api/posts/${postId}/flag`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ reason: 'Inappropriate content' });

    expect(response.status).toBe(200);
    expect(response.body.message).toContain('flagged');

    // Verify post is flagged in database
    const post = await Post.findById(postId);
    expect(post.flagged).toBe(true);
    expect(post.flagReason).toBe('Inappropriate content');
  });

  it('should reject flag without authentication', async () => {
    const response = await request(app)
      .post(`/api/posts/${postId}/flag`)
      .send({ reason: 'Test reason' });

    expect(response.status).toBe(401);
  });

  it('should return 404 for non-existent post', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    
    const response = await request(app)
      .post(`/api/posts/${fakeId}/flag`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ reason: 'Test reason' });

    expect(response.status).toBe(404);
  });
});

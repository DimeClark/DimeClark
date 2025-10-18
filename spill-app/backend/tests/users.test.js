/**
 * User Routes Tests
 * Tests for user profile operations
 */
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');

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
  await User.deleteMany({});

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

describe('GET /api/users/profile', () => {
  it('should get user profile with authentication', async () => {
    const response = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.email).toBe('test@example.com');
    expect(response.body.name).toBe('Test User');
    expect(response.body).not.toHaveProperty('password');
  });

  it('should reject profile request without authentication', async () => {
    const response = await request(app)
      .get('/api/users/profile');

    expect(response.status).toBe(401);
  });

  it('should reject profile request with invalid token', async () => {
    const response = await request(app)
      .get('/api/users/profile')
      .set('Authorization', 'Bearer invalid-token');

    expect(response.status).toBe(401);
  });
});

describe('PUT /api/users/profile', () => {
  it('should update user profile successfully', async () => {
    const updates = {
      name: 'Updated Name',
      bio: 'New bio here',
      city: 'New York',
    };

    const response = await request(app)
      .put('/api/users/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .send(updates);

    expect(response.status).toBe(200);
    expect(response.body.message).toContain('updated successfully');
    expect(response.body.user.name).toBe(updates.name);
    expect(response.body.user.bio).toBe(updates.bio);
    expect(response.body.user.city).toBe(updates.city);
  });

  it('should update social links', async () => {
    const updates = {
      socialLinks: {
        instagram: '@testuser',
        twitter: '@testuser',
      },
    };

    const response = await request(app)
      .put('/api/users/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .send(updates);

    expect(response.status).toBe(200);
    expect(response.body.user.socialLinks.instagram).toBe('@testuser');
  });

  it('should not allow updating email', async () => {
    const updates = {
      email: 'newemail@example.com',
    };

    const response = await request(app)
      .put('/api/users/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .send(updates);

    expect(response.status).toBe(200);
    
    // Verify email hasn't changed
    const user = await User.findById(userId);
    expect(user.email).toBe('test@example.com');
  });

  it('should not allow updating password', async () => {
    const originalUser = await User.findById(userId);
    const originalPassword = originalUser.password;

    const updates = {
      password: 'newpassword123',
    };

    const response = await request(app)
      .put('/api/users/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .send(updates);

    expect(response.status).toBe(200);
    
    // Verify password hasn't changed
    const user = await User.findById(userId);
    expect(user.password).toBe(originalPassword);
  });

  it('should not allow updating verifiedLGBTQ status', async () => {
    const updates = {
      verifiedLGBTQ: true,
    };

    const response = await request(app)
      .put('/api/users/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .send(updates);

    expect(response.status).toBe(200);
    
    // Verify verifiedLGBTQ hasn't changed
    const user = await User.findById(userId);
    expect(user.verifiedLGBTQ).toBe(false);
  });

  it('should reject update without authentication', async () => {
    const response = await request(app)
      .put('/api/users/profile')
      .send({ name: 'New Name' });

    expect(response.status).toBe(401);
  });
});

describe('GET /api/users/search', () => {
  beforeEach(async () => {
    // Create additional test users
    await User.create({
      email: 'user2@example.com',
      password: 'password123',
      name: 'Alex Smith',
      pronouns: 'she/her',
      genderIdentity: 'trans woman',
      orientation: 'lesbian',
      city: 'Los Angeles',
    });

    await User.create({
      email: 'user3@example.com',
      password: 'password123',
      name: 'Jamie Lee',
      pronouns: 'he/him',
      genderIdentity: 'trans man',
      orientation: 'gay',
      city: 'San Francisco',
    });
  });

  it('should search users by name', async () => {
    const response = await request(app)
      .get('/api/users/search?query=Alex');

    expect(response.status).toBe(200);
    expect(response.body.users.length).toBeGreaterThan(0);
    expect(response.body.users[0].name).toContain('Alex');
  });

  it('should search users by pronouns', async () => {
    const response = await request(app)
      .get('/api/users/search?pronouns=she/her');

    expect(response.status).toBe(200);
    expect(response.body.users.length).toBeGreaterThan(0);
    expect(response.body.users[0].pronouns).toBe('she/her');
  });

  it('should search users by city', async () => {
    const response = await request(app)
      .get('/api/users/search?city=Los Angeles');

    expect(response.status).toBe(200);
    expect(response.body.users.length).toBeGreaterThan(0);
    expect(response.body.users[0].city).toContain('Los Angeles');
  });

  it('should search users by gender identity', async () => {
    const response = await request(app)
      .get('/api/users/search?genderIdentity=trans woman');

    expect(response.status).toBe(200);
    expect(response.body.users.length).toBeGreaterThan(0);
  });

  it('should not return passwords in search results', async () => {
    const response = await request(app)
      .get('/api/users/search?query=Alex');

    expect(response.status).toBe(200);
    if (response.body.users.length > 0) {
      expect(response.body.users[0]).not.toHaveProperty('password');
    }
  });

  it('should limit search results to 50 users', async () => {
    const response = await request(app)
      .get('/api/users/search');

    expect(response.status).toBe(200);
    expect(response.body.users.length).toBeLessThanOrEqual(50);
  });

  it('should return empty array for no matches', async () => {
    const response = await request(app)
      .get('/api/users/search?query=NonexistentUser12345');

    expect(response.status).toBe(200);
    expect(response.body.users).toHaveLength(0);
  });

  it('should be accessible without authentication', async () => {
    const response = await request(app)
      .get('/api/users/search?query=Test');

    expect(response.status).toBe(200);
  });
});

/**
 * Authentication Routes Tests
 * Tests for user registration and login
 */
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');

// Test database connection
const MONGODB_TEST_URI = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/spill-app-test';

beforeAll(async () => {
  await mongoose.connect(MONGODB_TEST_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  // Clear users collection before each test
  await User.deleteMany({});
});

describe('POST /api/auth/register', () => {
  const validUser = {
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
    pronouns: 'they/them',
    genderIdentity: 'non-binary',
    orientation: 'queer',
    city: 'San Francisco',
  };

  it('should register a new user successfully', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send(validUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user.email).toBe(validUser.email);
    expect(response.body.user).not.toHaveProperty('password');
  });

  it('should reject registration with missing required fields', async () => {
    const invalidUser = {
      email: 'test@example.com',
      password: 'password123',
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(invalidUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

  it('should reject registration with invalid email', async () => {
    const invalidUser = { ...validUser, email: 'invalid-email' };

    const response = await request(app)
      .post('/api/auth/register')
      .send(invalidUser);

    expect(response.status).toBe(400);
  });

  it('should reject registration with short password', async () => {
    const invalidUser = { ...validUser, password: '12345' };

    const response = await request(app)
      .post('/api/auth/register')
      .send(invalidUser);

    expect(response.status).toBe(400);
  });

  it('should reject duplicate email registration', async () => {
    // Register first user
    await request(app)
      .post('/api/auth/register')
      .send(validUser);

    // Try to register again with same email
    const response = await request(app)
      .post('/api/auth/register')
      .send(validUser);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('User already exists');
  });
});

describe('POST /api/auth/login', () => {
  const testUser = {
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
    pronouns: 'they/them',
    genderIdentity: 'non-binary',
    orientation: 'queer',
    city: 'San Francisco',
  };

  beforeEach(async () => {
    // Register a test user before each login test
    await request(app)
      .post('/api/auth/register')
      .send(testUser);
  });

  it('should login with valid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user.email).toBe(testUser.email);
  });

  it('should reject login with invalid email', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'wrong@example.com',
        password: testUser.password,
      });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Invalid credentials');
  });

  it('should reject login with invalid password', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: 'wrongpassword',
      });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Invalid credentials');
  });

  it('should reject login with missing credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({});

    expect(response.status).toBe(400);
  });
});

describe('POST /api/auth/oauth/apple', () => {
  it('should return not implemented status', async () => {
    const response = await request(app)
      .post('/api/auth/oauth/apple')
      .send({});

    expect(response.status).toBe(501);
    expect(response.body.message).toContain('not yet implemented');
  });
});

describe('POST /api/auth/oauth/google', () => {
  it('should return not implemented status', async () => {
    const response = await request(app)
      .post('/api/auth/oauth/google')
      .send({});

    expect(response.status).toBe(501);
    expect(response.body.message).toContain('not yet implemented');
  });
});

/**
 * Vibe Check Routes Tests
 * Tests for AI-powered message sentiment analysis
 */
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');

const MONGODB_TEST_URI = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/spill-app-test';

let authToken;

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
});

describe('POST /api/vibe-check/analyze', () => {
  it('should analyze a positive message', async () => {
    const message = 'I really respect your boundaries and appreciate your honesty. Thank you for being so kind and understanding.';

    const response = await request(app)
      .post('/api/vibe-check/analyze')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ message });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('score');
    expect(response.body).toHaveProperty('level');
    expect(response.body).toHaveProperty('color');
    expect(response.body).toHaveProperty('indicators');
    expect(response.body).toHaveProperty('recommendations');
    expect(response.body.score).toBeGreaterThan(50);
    expect(response.body.level).toBe('good');
  });

  it('should detect red flags in manipulative message', async () => {
    const message = "You're being too sensitive. I was just joking. You're overreacting and acting crazy.";

    const response = await request(app)
      .post('/api/vibe-check/analyze')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ message });

    expect(response.status).toBe(200);
    expect(response.body.score).toBeLessThan(50);
    expect(response.body.analysis.redFlagsDetected).toBeGreaterThan(0);
    
    // Check for red flag indicators
    const hasRedFlagIndicator = response.body.indicators.some(
      indicator => indicator.type === 'negative'
    );
    expect(hasRedFlagIndicator).toBe(true);
  });

  it('should detect green flags in respectful message', async () => {
    const message = 'I respect your pronouns and want to make sure you feel comfortable. Your consent is important to me.';

    const response = await request(app)
      .post('/api/vibe-check/analyze')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ message });

    expect(response.status).toBe(200);
    expect(response.body.analysis.greenFlagsDetected).toBeGreaterThan(0);
    
    // Check for green flag indicators
    const hasGreenFlagIndicator = response.body.indicators.some(
      indicator => indicator.type === 'positive'
    );
    expect(hasGreenFlagIndicator).toBe(true);
  });

  it('should handle neutral message', async () => {
    const message = 'What time works for you tomorrow?';

    const response = await request(app)
      .post('/api/vibe-check/analyze')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ message });

    expect(response.status).toBe(200);
    expect(response.body.score).toBeGreaterThan(0);
    expect(response.body.score).toBeLessThanOrEqual(100);
  });

  it('should provide recommendations based on analysis', async () => {
    const message = 'Test message for recommendations';

    const response = await request(app)
      .post('/api/vibe-check/analyze')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ message });

    expect(response.status).toBe(200);
    expect(response.body.recommendations).toBeInstanceOf(Array);
    expect(response.body.recommendations.length).toBeGreaterThan(0);
  });

  it('should reject empty message', async () => {
    const response = await request(app)
      .post('/api/vibe-check/analyze')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ message: '' });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('required');
  });

  it('should reject analysis without authentication', async () => {
    const response = await request(app)
      .post('/api/vibe-check/analyze')
      .send({ message: 'Test message' });

    expect(response.status).toBe(401);
  });

  it('should return analysis with proper structure', async () => {
    const message = 'Sample message for structure test';

    const response = await request(app)
      .post('/api/vibe-check/analyze')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ message });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      score: expect.any(Number),
      level: expect.stringMatching(/good|mixed|caution/),
      color: expect.stringMatching(/^#[0-9A-F]{6}$/i),
      indicators: expect.any(Array),
      recommendations: expect.any(Array),
      analysis: expect.objectContaining({
        sentimentScore: expect.any(Number),
        comparative: expect.any(Number),
        redFlagsDetected: expect.any(Number),
        greenFlagsDetected: expect.any(Number),
      }),
    });
  });
});

describe('GET /api/vibe-check/history', () => {
  it('should return placeholder message', async () => {
    const response = await request(app)
      .get('/api/vibe-check/history')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toContain('coming soon');
  });

  it('should reject history request without authentication', async () => {
    const response = await request(app)
      .get('/api/vibe-check/history');

    expect(response.status).toBe(401);
  });
});

# Testing Guide - Spill App

This guide covers testing strategies and procedures for the Spill backend API and mobile application.

## Table of Contents
- [Backend Testing](#backend-testing)
- [Mobile App Testing](#mobile-app-testing)
- [Test Coverage](#test-coverage)
- [Continuous Integration](#continuous-integration)

## Backend Testing

### Running Tests

The backend uses **Jest** and **Supertest** for testing.

#### Run all tests:
```bash
cd spill-app/backend
npm test
```

#### Run tests in watch mode (during development):
```bash
npm run test:watch
```

#### Run tests with coverage report:
```bash
npm run test:coverage
```

### Test Structure

Tests are organized in the `/tests` directory:

```
backend/
├── tests/
│   ├── auth.test.js       # Authentication tests
│   ├── posts.test.js      # Posts CRUD tests
│   ├── users.test.js      # User profile tests
│   └── vibe-check.test.js # AI sentiment analysis tests
```

### Test Database

Tests use a separate MongoDB database (`spill-app-test`) to avoid affecting production data.

**Configuration:**
- Test DB is automatically created/dropped
- Each test starts with a clean database
- Uses `MONGODB_TEST_URI` environment variable

**Setup:**
```bash
# In .env file
MONGODB_TEST_URI=mongodb://localhost:27017/spill-app-test
```

### Test Coverage Areas

#### 1. Authentication Tests (`auth.test.js`)

**Covered scenarios:**
- ✅ User registration with valid data
- ✅ Registration validation (email format, password length, required fields)
- ✅ Duplicate email rejection
- ✅ User login with valid credentials
- ✅ Login with invalid credentials
- ✅ OAuth placeholder endpoints
- ✅ JWT token generation
- ✅ Password hashing verification

**Example test:**
```javascript
it('should register a new user successfully', async () => {
  const response = await request(app)
    .post('/api/auth/register')
    .send(validUser);

  expect(response.status).toBe(201);
  expect(response.body).toHaveProperty('token');
  expect(response.body.user.email).toBe(validUser.email);
});
```

#### 2. Posts Tests (`posts.test.js`)

**Covered scenarios:**
- ✅ Get all posts (feed)
- ✅ Filter posts by type (spill/sip/brew)
- ✅ Filter posts by tags
- ✅ Pagination
- ✅ Create new post (authenticated)
- ✅ Anonymous posting
- ✅ Like/unlike posts
- ✅ Add comments
- ✅ Flag inappropriate content
- ✅ Authorization checks

**Example test:**
```javascript
it('should like a post', async () => {
  const response = await request(app)
    .post(`/api/posts/${postId}/like`)
    .set('Authorization', `Bearer ${authToken}`);

  expect(response.status).toBe(200);
  expect(response.body.likes).toBe(1);
});
```

#### 3. User Tests (`users.test.js`)

**Covered scenarios:**
- ✅ Get user profile (authenticated)
- ✅ Update user profile
- ✅ Prevent updating sensitive fields (email, password, verified status)
- ✅ Update social links
- ✅ Search users by name
- ✅ Search users by pronouns
- ✅ Search users by city
- ✅ Search users by gender identity
- ✅ Authorization checks
- ✅ Password not returned in responses

**Example test:**
```javascript
it('should update user profile successfully', async () => {
  const updates = {
    name: 'Updated Name',
    bio: 'New bio here',
  };

  const response = await request(app)
    .put('/api/users/profile')
    .set('Authorization', `Bearer ${authToken}`)
    .send(updates);

  expect(response.status).toBe(200);
  expect(response.body.user.name).toBe(updates.name);
});
```

#### 4. Vibe Check Tests (`vibe-check.test.js`)

**Covered scenarios:**
- ✅ Analyze positive messages
- ✅ Detect red flags (manipulation, gaslighting)
- ✅ Detect green flags (respect, consent)
- ✅ Handle neutral messages
- ✅ Generate appropriate recommendations
- ✅ Reject empty messages
- ✅ Authorization checks
- ✅ Response structure validation

**Example test:**
```javascript
it('should detect red flags in manipulative message', async () => {
  const message = "You're being too sensitive. I was just joking.";

  const response = await request(app)
    .post('/api/vibe-check/analyze')
    .set('Authorization', `Bearer ${authToken}`)
    .send({ message });

  expect(response.status).toBe(200);
  expect(response.body.score).toBeLessThan(50);
  expect(response.body.analysis.redFlagsDetected).toBeGreaterThan(0);
});
```

### Writing New Tests

When adding new features, follow this pattern:

```javascript
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Model = require('../models/Model');

describe('Feature Name', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Model.deleteMany({});
    // Set up test data
  });

  it('should do something', async () => {
    const response = await request(app)
      .post('/api/endpoint')
      .send(data);

    expect(response.status).toBe(200);
    // Add assertions
  });
});
```

### Best Practices

1. **Isolation**: Each test should be independent
2. **Cleanup**: Clear database before/after tests
3. **Meaningful names**: Describe what the test does
4. **Assert thoroughly**: Check status codes, response structure, and data
5. **Edge cases**: Test error conditions and validation

## Mobile App Testing

### Running Tests

The mobile app uses **Jest** with **React Native Testing Library**.

#### Run all tests:
```bash
cd spill-app/mobile
npm test
```

#### Run tests in watch mode:
```bash
npm run test:watch
```

#### Run tests with coverage:
```bash
npm run test:coverage
```

### Test Structure

Tests are organized in the `/__tests__` directory:

```
mobile/
├── __tests__/
│   ├── App.test.tsx           # Main app tests
│   ├── auth/                  # Authentication screen tests
│   ├── components/            # Component tests
│   └── services/              # Service/API tests
```

### Testing Setup

**Jest configuration** in `package.json`:
```json
{
  "jest": {
    "preset": "jest-expo",
    "transformIgnorePatterns": [
      "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*)"
    ]
  }
}
```

### Component Testing Example

```typescript
import { render, fireEvent } from '@testing-library/react-native';
import MyComponent from '../components/MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    const { getByText } = render(<MyComponent />);
    expect(getByText('Hello')).toBeTruthy();
  });

  it('should handle button press', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <MyComponent onPress={onPress} />
    );
    
    fireEvent.press(getByText('Button'));
    expect(onPress).toHaveBeenCalled();
  });
});
```

### API Service Testing Example

```typescript
import { login } from '../services/api';
import axios from 'axios';

jest.mock('axios');

describe('API Service', () => {
  it('should login successfully', async () => {
    const mockResponse = { data: { token: 'abc123' } };
    axios.post.mockResolvedValue(mockResponse);

    const result = await login('test@example.com', 'password');
    expect(result.token).toBe('abc123');
  });
});
```

### Current Test Coverage

Basic infrastructure tests are in place. As you develop features, add tests for:

- [ ] Authentication screens
- [ ] Feed screen
- [ ] Search screen
- [ ] Vibe Check screen
- [ ] Profile screen
- [ ] API service functions
- [ ] Utility functions
- [ ] Custom hooks

## Test Coverage

### Current Backend Coverage

```
File           | % Stmts | % Branch | % Funcs | % Lines
---------------|---------|----------|---------|--------
All files      |    >80  |    >75   |   >80   |   >80
 routes/       |    100  |    100   |   100   |   100
  auth.js      |    100  |    100   |   100   |   100
  posts.js     |    100  |    100   |   100   |   100
  users.js     |    100  |    100   |   100   |   100
  vibe-check.js|    100  |    100   |   100   |   100
```

### Viewing Coverage Report

After running tests with coverage:
```bash
# Backend
cd spill-app/backend
npm run test:coverage
open coverage/lcov-report/index.html

# Mobile
cd spill-app/mobile
npm run test:coverage
open coverage/lcov-report/index.html
```

### Coverage Goals

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

## Integration Testing

### Manual API Testing

Use tools like **Postman**, **Insomnia**, or **curl** to test API endpoints manually.

#### Example: Test registration
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User",
    "pronouns": "they/them",
    "genderIdentity": "non-binary",
    "orientation": "queer",
    "city": "San Francisco"
  }'
```

#### Example: Test Vibe Check
```bash
curl -X POST http://localhost:3000/api/vibe-check/analyze \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "message": "I respect your boundaries and appreciate your honesty."
  }'
```

### End-to-End Testing

For comprehensive E2E testing of the mobile app:

1. **Install Detox** (React Native E2E framework)
2. **Write E2E scenarios**:
   - User registration flow
   - Login flow
   - Creating a post
   - Searching users
   - Running vibe check

Example E2E test with Detox:
```javascript
describe('Authentication', () => {
  it('should register and login', async () => {
    await element(by.id('signup-button')).tap();
    await element(by.id('email-input')).typeText('test@example.com');
    await element(by.id('password-input')).typeText('password123');
    await element(by.id('submit-button')).tap();
    await expect(element(by.id('feed-screen'))).toBeVisible();
  });
});
```

## Continuous Integration

### GitHub Actions Workflow

Create `.github/workflows/test.yml`:

```yaml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  backend-tests:
    runs-on: ubuntu-latest
    
    services:
      mongodb:
        image: mongo:7
        ports:
          - 27017:27017

    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: |
          cd spill-app/backend
          npm ci
      
      - name: Run tests
        run: |
          cd spill-app/backend
          npm test
        env:
          MONGODB_TEST_URI: mongodb://localhost:27017/spill-app-test
          JWT_SECRET: test-secret
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./spill-app/backend/coverage/lcov.info

  mobile-tests:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: |
          cd spill-app/mobile
          npm ci
      
      - name: Run tests
        run: |
          cd spill-app/mobile
          npm test
```

### Pre-commit Hooks

Install **Husky** to run tests before commits:

```bash
npm install --save-dev husky
npx husky install
npx husky add .husky/pre-commit "cd spill-app/backend && npm test"
```

## Troubleshooting

### Common Test Issues

**MongoDB connection timeout**
```bash
# Solution: Ensure MongoDB is running
# Start MongoDB locally:
mongod --dbpath /path/to/data
```

**Port already in use**
```bash
# Solution: Kill process using port 3000
lsof -ti:3000 | xargs kill -9
```

**Tests hanging**
```bash
# Solution: Add --forceExit flag
npm test -- --forceExit
```

**Module not found errors**
```bash
# Solution: Clear Jest cache
jest --clearCache
npm install
```

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Testing Best Practices](https://testingjavascript.com/)

---

**Last Updated:** 2024
**Maintained by:** DimeClark

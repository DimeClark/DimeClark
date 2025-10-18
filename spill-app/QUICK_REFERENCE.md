# Spill App - Quick Reference Card

## 🚀 Quick Start Commands

### Initial Setup
```bash
cd spill-app
./setup.sh                    # Automated setup
```

### Development
```bash
# Backend API
cd backend
npm run dev                   # Start with nodemon (http://localhost:3000)

# Mobile App
cd mobile
npm start                     # Start Expo (scan QR or press i/a)

# Docker (Alternative)
cd spill-app
docker-compose up            # Start full stack
```

### Testing
```bash
# Backend
cd backend
npm test                     # Run all tests
npm run test:watch          # Watch mode
npm run test:coverage       # With coverage

# Mobile
cd mobile
npm test                     # Run all tests
npm run test:watch          # Watch mode
```

## 📡 API Endpoints

### Base URL
- Development: `http://localhost:3000`
- Production: `https://your-domain.com`

### Authentication
```bash
# Register
POST /api/auth/register
Body: { email, password, name, pronouns, genderIdentity, orientation, city }

# Login
POST /api/auth/login
Body: { email, password }
Returns: { token, user }
```

### Protected Routes
Add header: `Authorization: Bearer <token>`

### Users
```bash
GET    /api/users/profile              # Get own profile
PUT    /api/users/profile              # Update profile
GET    /api/users/search?query=...    # Search users
```

### Posts
```bash
GET    /api/posts                      # Get feed
POST   /api/posts                      # Create post
POST   /api/posts/:id/like             # Like/unlike
POST   /api/posts/:id/comment          # Add comment
POST   /api/posts/:id/flag             # Flag content
```

### Vibe Check
```bash
POST   /api/vibe-check/analyze         # Analyze message
Body: { message: "text to analyze" }
Returns: { score, level, color, indicators, recommendations }
```

### Health Check
```bash
GET    /health                         # No auth required
Returns: { status, timestamp, uptime }
```

## 🔐 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/spill-app
MONGODB_TEST_URI=mongodb://localhost:27017/spill-app-test
JWT_SECRET=your-secret-key
SENTRY_DSN=https://...@sentry.io/...
```

### Mobile (app.json)
```json
{
  "extra": {
    "apiUrl": "http://localhost:3000",
    "sentryDsn": "https://...@sentry.io/...",
    "environment": "development"
  }
}
```

## 📊 Test Coverage

### Run Coverage
```bash
cd backend && npm run test:coverage
open coverage/lcov-report/index.html
```

### Current Coverage
- Auth Routes: 100%
- Posts Routes: 100%
- User Routes: 100%
- Vibe Check: 100%
- Overall: 80%+

## 🐳 Docker Commands

### Development
```bash
docker-compose up              # Start all services
docker-compose up -d           # Start in background
docker-compose down            # Stop all services
docker-compose logs -f api     # View API logs
```

### Build Only
```bash
cd backend
docker build -t spill-api .
docker run -p 3000:3000 spill-api
```

## 📱 Mobile App Commands

### Development
```bash
npm start           # Start Expo
npm run ios         # Run iOS simulator
npm run android     # Run Android emulator
npm run web         # Run in browser
```

### Building
```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure
eas build:configure

# Build
eas build --platform ios        # iOS
eas build --platform android    # Android
eas build --platform all        # Both

# Submit
eas submit --platform ios
eas submit --platform android
```

## 🔍 Common Issues

### MongoDB Connection Error
```bash
# Start MongoDB locally
mongod --dbpath /path/to/data

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Jest Tests Hanging
```bash
# Add --forceExit flag
npm test -- --forceExit
```

### Mobile Dependencies Error
```bash
# Use legacy peer deps
cd mobile
npm install --legacy-peer-deps
```

## 📚 Documentation Links

| Document | Purpose |
|----------|---------|
| [README.md](./README.md) | Project overview |
| [QUICKSTART.md](./QUICKSTART.md) | 10-minute setup |
| [COMPLETION_SUMMARY.md](./COMPLETION_SUMMARY.md) | What's built |
| [docs/API.md](./docs/API.md) | API reference |
| [docs/TESTING.md](./docs/TESTING.md) | Testing guide |
| [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) | Deploy guide |
| [docs/PRODUCTION_CHECKLIST.md](./docs/PRODUCTION_CHECKLIST.md) | Launch checklist |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | How to contribute |

## 🎨 Design Tokens

```javascript
// Colors
const colors = {
  neonPink: '#FF10F0',      // Primary
  lavender: '#B695F8',      // Secondary
  deepBlack: '#0A0A0A',     // Background
  darkGray: '#1A1A1A',      // Cards
  white: '#FFFFFF',         // Text
};

// Spacing (consistent scale)
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};
```

## 🧪 Test Examples

### Backend Test
```javascript
it('should create a post', async () => {
  const response = await request(app)
    .post('/api/posts')
    .set('Authorization', `Bearer ${token}`)
    .send({ type: 'spill', content: 'Test' });

  expect(response.status).toBe(201);
  expect(response.body.post).toHaveProperty('_id');
});
```

### Mobile Test
```typescript
import { render } from '@testing-library/react-native';

it('should render component', () => {
  const { getByText } = render(<MyComponent />);
  expect(getByText('Hello')).toBeTruthy();
});
```

## 🔧 Useful Scripts

### Backend
```json
{
  "start": "node server.js",
  "dev": "nodemon server.js",
  "test": "jest --detectOpenHandles --forceExit",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
}
```

### Mobile
```json
{
  "start": "expo start",
  "ios": "expo start --ios",
  "android": "expo start --android",
  "test": "jest",
  "test:watch": "jest --watch"
}
```

## 📦 Key Dependencies

### Backend
- express (4.18.2) - Web framework
- mongoose (8.0.0) - MongoDB ODM
- jsonwebtoken (9.0.2) - JWT auth
- bcryptjs (2.4.3) - Password hashing
- sentiment (5.0.2) - AI sentiment analysis
- @sentry/node - Error tracking
- express-rate-limit - Rate limiting

### Mobile
- expo (~51.0.0) - React Native framework
- expo-router (~3.5.0) - Navigation
- nativewind (2.0.11) - TailwindCSS
- axios (1.6.0) - API client
- @sentry/react-native - Crash reporting

## 🎯 Quick Debugging

### Check API Health
```bash
curl http://localhost:3000/health
```

### Test Authentication
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123","name":"Test","pronouns":"they/them","genderIdentity":"non-binary","orientation":"queer","city":"NYC"}'
```

### Check Logs
```bash
# Backend
cd backend && npm run dev

# Docker
docker-compose logs -f api
docker-compose logs -f mongo
```

## 💡 Pro Tips

1. **Use setup.sh** for quick initial setup
2. **Run tests before committing** to catch errors early
3. **Use docker-compose** for consistent environment
4. **Check health endpoint** to verify API is running
5. **Read error messages** in Sentry for production issues
6. **Use environment variables** never hardcode secrets
7. **Test on real devices** before app store submission

## 🆘 Get Help

- **Documentation**: Check `/docs` folder
- **Issues**: [GitHub Issues](https://github.com/DimeClark/DimeClark/issues)
- **Email**: dimeclark5@gmail.com

---

**Made with 💜 for the Girls and Gays by DimeClark**

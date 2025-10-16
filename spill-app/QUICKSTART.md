# Quick Start Guide

## Getting Started with Spill

This guide will help you get the Spill app running on your local machine in under 10 minutes.

## Prerequisites

Before you begin, make sure you have:
- Node.js 18+ installed ([Download](https://nodejs.org))
- MongoDB installed locally OR MongoDB Atlas account ([Sign up](https://www.mongodb.com/cloud/atlas))
- npm or yarn package manager
- (Optional) Expo Go app on your phone for mobile testing

## Step 1: Clone the Repository

```bash
git clone https://github.com/DimeClark/DimeClark.git
cd DimeClark/spill-app
```

## Step 2: Set Up Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your settings
# At minimum, set:
# - MONGODB_URI (use local or Atlas connection string)
# - JWT_SECRET (any random string for development)

# Start the backend server
npm run dev
```

The API should now be running at `http://localhost:3000`

## Step 3: Set Up Mobile App

Open a new terminal window:

```bash
# Navigate to mobile app
cd mobile

# Install dependencies
npm install

# Start Expo
npm start
```

This will open Expo DevTools in your browser.

## Step 4: Run on Your Device

### Option A: Physical Device (Recommended)
1. Install Expo Go app from App Store (iOS) or Play Store (Android)
2. Scan the QR code from Expo DevTools with your camera (iOS) or Expo Go app (Android)
3. The app will load on your device

### Option B: iOS Simulator (Mac only)
1. Press `i` in the Expo terminal
2. Wait for iOS Simulator to launch

### Option C: Android Emulator
1. Set up Android Studio and emulator
2. Press `a` in the Expo terminal

## Step 5: Test the App

1. **Onboarding Screen**: You should see the Spill welcome screen
2. **Sign Up**: Create a test account with:
   - Email: test@example.com
   - Password: password123
   - Fill in pronouns, gender identity, etc.
3. **Explore**: Navigate through the tabs:
   - Feed: See mock posts
   - Search: Try the search filters
   - Vibe Check: Test message analysis
   - Profile: View your profile

## Testing the Vibe Check Feature

Try analyzing these sample messages:

**Good Vibes (should score high):**
```
Hey! I noticed your pronouns in your bio. I want to make sure I'm being respectful. How has your day been?
```

**Red Flags (should score low):**
```
What's your real name? You're being too sensitive about this.
```

## Common Issues

### Backend won't start
- **Issue**: MongoDB connection error
- **Solution**: Make sure MongoDB is running locally or check your Atlas connection string

### Mobile app shows network error
- **Issue**: Can't connect to backend API
- **Solution**: 
  - Make sure backend is running on port 3000
  - Update API URL in mobile app if needed (for physical device, use your computer's IP)

### Expo won't start
- **Issue**: Port already in use
- **Solution**: Kill the process on port 19000 or use `npx expo start --port 19001`

## Next Steps

- **Customize**: Edit colors in `tailwind.config.js`
- **Add Data**: Create more test posts through the API
- **Explore Code**: Check out the component structure in `/mobile/app`
- **API Testing**: Use the API docs in `/docs/API.md`

## Development Tips

1. **Hot Reload**: Changes to mobile code will auto-refresh
2. **Backend Changes**: Nodemon will auto-restart the server
3. **Debugging**: Use React DevTools and browser console
4. **Database**: Use MongoDB Compass to view/edit data

## Need Help?

- 📚 Read the full [README](../README.md)
- 🎨 Check the [Design System](./docs/DESIGN.md)
- 🔌 Review [API Documentation](./docs/API.md)
- 👥 Read [Community Guidelines](./docs/COMMUNITY_GUIDELINES.md)

## Production Deployment

When ready to deploy:

### Backend
- Use a cloud MongoDB (MongoDB Atlas)
- Set strong JWT_SECRET
- Deploy to Heroku, Railway, or DigitalOcean
- Enable HTTPS

### Mobile App
- Build with `expo build:ios` or `expo build:android`
- Submit to App Store / Play Store
- Update API URLs to production endpoints

---

Happy coding! 💜 Made with love for the LGBTQ+ community.

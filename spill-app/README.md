# Spill - LGBTQ+ Dating Review App 🏳️‍🌈

![Spill App](https://img.shields.io/badge/Platform-React%20Native-blue)
![Backend](https://img.shields.io/badge/Backend-Node.js-green)
![Database](https://img.shields.io/badge/Database-MongoDB-brightgreen)

**Spill** is a safe, inclusive, and anonymous community platform for LGBTQ+ users (transgender people, gay men, lesbians, nonbinary, and queer folk) to share authentic dating experiences and get verified feedback before or after meeting someone.

## 🌟 Features

### Core Features
- **Authentication**: Email, Apple ID, and Google OAuth support
- **User Profiles**: Name, pronouns, gender identity, orientation, city, and optional social links
- **Post Types**:
  - **Spill** ☕: Share dating experiences (good or bad) with ratings and keywords
  - **Sip** 🍵: React and comment on others' experiences with the same person
  - **Brew** 🫖: Share anonymous stories or screenshots of message exchanges
  
### Unique Features
- **Vibe Check** 🤖: AI-powered message analysis tool
  - Analyzes tone, respectfulness, and emotional safety
  - Detects manipulation, gaslighting, aggression, or kindness
  - Color-coded results (🟢 green = good vibes, 🟡 yellow = mixed, 🔴 red = caution)

- **Advanced Search & Filters**: Search by name, location, zodiac, pronouns, keywords
- **Community Moderation**: Flag hate speech and protect against outing
- **LGBTQ+ Verified Badge**: Authenticity and safety verification system
- **Safe Date Tips Hub** 🛡️: Resources, hotlines, and guides for the community

## 🎨 Design

### Visual Style
- **Colors**: Neon pink (#FF10F0), Lavender (#B695F8), Deep black (#0A0A0A)
- **Typography**: Bold, modern, gender-inclusive
- **UI Style**: Mix of Instagram stories and YikYak, with polished minimalist design
- **Animations**: Smooth transitions throughout

## 🚀 Tech Stack

### Frontend (Mobile)
- **React Native** with Expo
- **NativeWind** (TailwindCSS for React Native)
- **Expo Router** for navigation
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Sentiment Analysis** for Vibe Check AI
- **bcryptjs** for password hashing

## 📁 Project Structure

```
spill-app/
├── mobile/                 # React Native mobile app
│   ├── app/               # App screens and navigation
│   │   ├── (tabs)/       # Main tab screens
│   │   │   ├── feed.tsx  # Main feed
│   │   │   ├── search.tsx
│   │   │   ├── vibe-check.tsx
│   │   │   └── profile.tsx
│   │   ├── auth/         # Authentication screens
│   │   │   ├── login.tsx
│   │   │   └── signup.tsx
│   │   ├── _layout.tsx   # Root layout
│   │   └── index.tsx     # Onboarding screen
│   ├── components/       # Reusable components
│   ├── services/         # API services
│   └── utils/            # Utility functions
│
├── backend/               # Node.js backend API
│   ├── models/           # MongoDB models
│   │   ├── User.js
│   │   └── Post.js
│   ├── routes/           # API routes
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── posts.js
│   │   └── vibe-check.js
│   ├── middleware/       # Custom middleware
│   │   └── auth.js
│   └── server.js         # Main server file
│
└── docs/                 # Documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Expo CLI (optional for mobile development)

### Backend Setup

1. Navigate to backend directory:
```bash
cd spill-app/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update environment variables in `.env`:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/spill-app
JWT_SECRET=your-secret-key-here
```

5. Start the server:
```bash
npm run dev
```

The API will be running at `http://localhost:3000`

### Mobile App Setup

1. Navigate to mobile directory:
```bash
cd spill-app/mobile
```

2. Install dependencies:
```bash
npm install
```

3. Start Expo:
```bash
npm start
```

4. Run on device/simulator:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app for physical device

## 📱 Screens

### Onboarding
- Welcome screen with app features
- Sign up / Sign in options

### Authentication
- Email registration with profile setup
- Apple ID and Google OAuth (coming soon)
- Fields: name, pronouns, gender identity, orientation, city

### Main Tabs
1. **Feed**: Browse spills, sips, and brews
2. **Search**: Advanced filtering and search
3. **Vibe Check**: AI message analysis
4. **Profile**: User settings and Safe Date Tips

## 🔒 Privacy & Safety

- **Anonymous Posting**: Users can post anonymously
- **Community Moderation**: Flag inappropriate content
- **Private Searches**: All searches are private and anonymous
- **LGBTQ+ Verified Badges**: Ensure community authenticity
- **Safe Date Resources**: Built-in safety resources and hotlines

## 🤖 AI Vibe Check

The Vibe Check feature uses sentiment analysis to evaluate messages for:
- Manipulation tactics and gaslighting
- Respectful communication
- Emotional safety
- Red flag language (aggression, pressure)
- Green flag indicators (respect, boundaries)

### How it works:
1. User pastes a message or conversation
2. AI analyzes tone, keywords, and patterns
3. Returns a Vibe Score (0-100) with color-coded level
4. Provides specific indicators and recommendations

## 🔮 Future Enhancements

- [ ] Real-time messaging
- [ ] Location-based dating app integration
- [ ] Advanced AI with OpenAI GPT
- [ ] Push notifications
- [ ] In-app moderation dashboard
- [ ] Community guidelines voting
- [ ] Verified user profiles
- [ ] Multi-language support

## 📄 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/oauth/apple` - Apple OAuth
- `POST /api/auth/oauth/google` - Google OAuth

### User Endpoints
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update profile (protected)
- `GET /api/users/search` - Search users

### Post Endpoints
- `GET /api/posts` - Get all posts (feed)
- `POST /api/posts` - Create post (protected)
- `POST /api/posts/:id/like` - Like/unlike post (protected)
- `POST /api/posts/:id/comment` - Add comment (protected)
- `POST /api/posts/:id/flag` - Flag post (protected)

### Vibe Check Endpoints
- `POST /api/vibe-check/analyze` - Analyze message (protected)
- `GET /api/vibe-check/history` - Get analysis history (protected)

## 👥 Contributing

This project is built with inclusivity and community safety as top priorities. Contributions that align with these values are welcome!

## 📝 License

MIT License - See LICENSE file for details

## 💜 About

**Spill** is designed by and for the LGBTQ+ community. Our mission is to create a safer dating environment through transparency, community support, and authentic experiences.

Made with 💜 for the Girls and Gays by **DimeClark**

---

**Note**: This app does not copy any proprietary design or data structures from existing apps. All branding, features, and implementation are original.

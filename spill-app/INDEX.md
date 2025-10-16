# 📚 Spill Documentation Index

Welcome to the Spill documentation! This index will help you navigate all the resources available.

## 🚀 Getting Started

1. **[Quick Start Guide](./QUICKSTART.md)** - Get up and running in 10 minutes
2. **[Main README](./README.md)** - Complete project overview
3. **[Project Summary](./PROJECT_SUMMARY.md)** - High-level summary of what was built

## 📖 Documentation

### For Developers
- **[Architecture](./docs/ARCHITECTURE.md)** - System design and data flow diagrams
- **[API Documentation](./docs/API.md)** - Complete API reference
- **[Design System](./docs/DESIGN.md)** - UI/UX guidelines and specifications
- **[Contributing Guide](./CONTRIBUTING.md)** - How to contribute to the project

### For Users
- **[Community Guidelines](./docs/COMMUNITY_GUIDELINES.md)** - Rules and safety information

## 🏗️ Project Structure

```
spill-app/
├── 📱 mobile/              # React Native mobile application
│   ├── app/               # Screen components
│   │   ├── (tabs)/       # Main tab navigation
│   │   ├── auth/         # Authentication screens
│   │   └── index.tsx     # Onboarding screen
│   ├── components/        # Reusable UI components
│   ├── services/          # API integration
│   └── utils/            # Utility functions
│
├── 🔧 backend/            # Node.js API server
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   ├── middleware/       # Auth & validation
│   ├── controllers/      # Business logic
│   ├── services/         # Helper services
│   └── server.js         # Main server file
│
├── 📚 docs/              # Documentation files
│   ├── API.md
│   ├── ARCHITECTURE.md
│   ├── DESIGN.md
│   └── COMMUNITY_GUIDELINES.md
│
└── 📄 Project files
    ├── README.md
    ├── QUICKSTART.md
    ├── PROJECT_SUMMARY.md
    ├── CONTRIBUTING.md
    └── LICENSE
```

## 🎯 Key Features

### Implemented ✅
- [x] User Authentication (Email, OAuth placeholders)
- [x] User Profiles with LGBTQ+ specific fields
- [x] Post Types: Spill ☕, Sip 🍵, Brew 🫖
- [x] AI Vibe Check for message analysis
- [x] Advanced Search & Filtering
- [x] Community Moderation (Flagging)
- [x] LGBTQ+ Verified Badges
- [x] Safe Date Tips Hub
- [x] Feed with pagination
- [x] Like/Comment system

### Coming Soon 🔄
- [ ] Real-time messaging
- [ ] Push notifications
- [ ] Advanced AI with GPT
- [ ] Dating app integrations
- [ ] Multi-language support

## 🛠️ Tech Stack

### Frontend
- **Framework**: React Native 0.74 with Expo ~51.0
- **Styling**: NativeWind (TailwindCSS)
- **Navigation**: Expo Router ~3.5
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express.js 4.18
- **Database**: MongoDB with Mongoose 8.0
- **Authentication**: JWT + bcryptjs
- **AI**: Sentiment analysis

## 📱 Screens Overview

| Screen | Path | Description |
|--------|------|-------------|
| Onboarding | `/` | Welcome screen with app intro |
| Sign Up | `/auth/signup` | User registration |
| Login | `/auth/login` | User authentication |
| Feed | `/(tabs)/feed` | Main content feed |
| Search | `/(tabs)/search` | Advanced search |
| Vibe Check | `/(tabs)/vibe-check` | AI message analysis |
| Profile | `/(tabs)/profile` | User settings & resources |

## 🔌 API Endpoints

### Authentication
```
POST /api/auth/register    # Register new user
POST /api/auth/login       # User login
POST /api/auth/oauth/apple # Apple OAuth
POST /api/auth/oauth/google # Google OAuth
```

### Users
```
GET  /api/users/profile    # Get user profile (protected)
PUT  /api/users/profile    # Update profile (protected)
GET  /api/users/search     # Search users
```

### Posts
```
GET  /api/posts            # Get feed
POST /api/posts            # Create post (protected)
POST /api/posts/:id/like   # Like/unlike (protected)
POST /api/posts/:id/comment # Add comment (protected)
POST /api/posts/:id/flag   # Flag content (protected)
```

### Vibe Check
```
POST /api/vibe-check/analyze # Analyze message (protected)
GET  /api/vibe-check/history # Get history (protected)
```

## 🎨 Design Resources

### Color Palette
```css
--neon-pink: #FF10F0;     /* Primary */
--lavender: #B695F8;      /* Secondary */
--deep-black: #0A0A0A;    /* Background */
--dark-gray: #1A1A1A;     /* Cards */
--medium-gray: #2A2A2A;   /* Borders */
```

### Typography
- Hero/Logo: 60px, Bold
- Page Title: 28-32px, Bold
- Section: 20px, Bold
- Body: 16px, Regular/Semi-bold
- Caption: 12-14px

### Components
- Buttons: 12px border radius, 16px padding
- Cards: 12px border radius, 1px border
- Inputs: 12px border radius, dark background
- Tags: 12px border radius, small size

## 🔒 Security Features

- **Authentication**: JWT-based with bcrypt hashing
- **Privacy**: Anonymous posting, private searches
- **Moderation**: Community flagging system
- **Verification**: LGBTQ+ verified badges
- **Safety**: Built-in crisis resources

## 🧪 Testing

### Run Tests
```bash
# Backend tests
cd backend
npm test

# Mobile tests
cd mobile
npm test

# End-to-end tests
npm run test:e2e
```

## 📊 Database Schema

### User Model
```javascript
{
  email: String (unique),
  password: String (hashed),
  name: String,
  pronouns: String,
  genderIdentity: String,
  orientation: String,
  city: String,
  verifiedLGBTQ: Boolean,
  badges: [String],
  createdAt: Date
}
```

### Post Model
```javascript
{
  type: String (spill|sip|brew),
  author: ObjectId,
  authorAnonymous: Boolean,
  content: String,
  rating: Number (1-5),
  tags: [String],
  likes: Number,
  comments: [Object],
  flagged: Boolean,
  createdAt: Date
}
```

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas
2. Configure environment variables
3. Deploy to Heroku/Railway/DigitalOcean
4. Enable HTTPS

### Mobile App Deployment
1. Build with Expo: `expo build:ios` / `expo build:android`
2. Submit to App Store / Play Store
3. Update API endpoints to production

## 🤝 Contributing

We welcome contributions! Please read:
1. [Contributing Guide](./CONTRIBUTING.md)
2. [Community Guidelines](./docs/COMMUNITY_GUIDELINES.md)
3. Code of Conduct (see CONTRIBUTING.md)

### How to Contribute
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/DimeClark/DimeClark/issues)
- **Email**: dimeclark5@gmail.com
- **LinkedIn**: [Diamond-Clark21](https://www.linkedin.com/in/Diamond-Clark21)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🏳️‍🌈 Community Resources

### Crisis Hotlines
- **The Trevor Project**: 1-866-488-7386 (24/7)
- **Trans Lifeline**: 1-877-565-8860
- **LGBT National Hotline**: 1-888-843-4564

### Safety Resources
- **RAINN**: 1-800-656-4673
- **National Domestic Violence Hotline**: 1-800-799-7233

## 🗺️ Roadmap

### Version 1.0 (Current) ✅
- Core functionality
- Basic AI vibe check
- Community features

### Version 1.1 (Next)
- Push notifications
- Enhanced AI
- Real-time features

### Version 2.0 (Future)
- Dating app integrations
- Web platform
- Advanced analytics

## 📈 Metrics & Analytics

Track:
- User engagement
- Vibe check usage
- Community safety
- Feature adoption

---

## Quick Links

| Document | Purpose | Audience |
|----------|---------|----------|
| [README](./README.md) | Project overview | Everyone |
| [QUICKSTART](./QUICKSTART.md) | Setup guide | Developers |
| [API](./docs/API.md) | API reference | Developers |
| [ARCHITECTURE](./docs/ARCHITECTURE.md) | System design | Developers |
| [DESIGN](./docs/DESIGN.md) | UI/UX specs | Designers |
| [CONTRIBUTING](./CONTRIBUTING.md) | How to contribute | Contributors |
| [COMMUNITY_GUIDELINES](./docs/COMMUNITY_GUIDELINES.md) | Community rules | Users |

---

**Made with 💜 for the LGBTQ+ community by DimeClark**

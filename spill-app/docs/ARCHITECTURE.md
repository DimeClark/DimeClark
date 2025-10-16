# Spill App Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      MOBILE APP (React Native)               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Onboarding  │  │     Auth     │  │  Main Tabs   │      │
│  │   Screen     │→ │ Login/Signup │→ │   (4 tabs)   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                              │                │
│                    ┌─────────────────────────┴────────────┐ │
│                    ↓                                        │ │
│  ┌──────────┐  ┌──────────┐  ┌────────────┐  ┌──────────┐ │
│  │   Feed   │  │  Search  │  │ Vibe Check │  │ Profile  │ │
│  │   ☕🍵🫖  │  │    🔍    │  │     🤖     │  │    👤    │ │
│  └──────────┘  └──────────┘  └────────────┘  └──────────┘ │
│                                                               │
└───────────────────────────┬───────────────────────────────┘
                            │
                    ┌───────▼────────┐
                    │   API Layer    │
                    │   (Axios)      │
                    └───────┬────────┘
                            │
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND API (Node.js/Express)              │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                    Routes/Controllers                  │   │
│  │                                                        │   │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌──────────────┐  │   │
│  │  │  Auth  │ │ Users  │ │ Posts  │ │  Vibe Check  │  │   │
│  │  │ /login │ │/profile│ │ /feed  │ │  /analyze    │  │   │
│  │  │/register│ │/search │ │ /like  │ │              │  │   │
│  │  └────────┘ └────────┘ └────────┘ └──────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│                            │                                  │
│                            ↓                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   Middleware Layer                     │   │
│  │                                                        │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │   │
│  │  │     JWT      │  │  Validation  │  │   Error    │  │   │
│  │  │     Auth     │  │   (express-  │  │  Handling  │  │   │
│  │  │              │  │  validator)  │  │            │  │   │
│  │  └──────────────┘  └──────────────┘  └────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│                            │                                  │
│                            ↓                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   Business Logic                       │   │
│  │                                                        │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │          Sentiment Analysis (Vibe Check)        │  │   │
│  │  │  • Red flag detection                           │  │   │
│  │  │  • Green flag identification                    │  │   │
│  │  │  • Tone analysis                                │  │   │
│  │  │  • Score calculation (0-100)                    │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│                            │                                  │
│                            ↓                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   Data Models (Mongoose)              │   │
│  │                                                        │   │
│  │  ┌────────────┐           ┌────────────┐            │   │
│  │  │    User    │           │    Post    │            │   │
│  │  ├────────────┤           ├────────────┤            │   │
│  │  │ email      │           │ type       │            │   │
│  │  │ password   │           │ content    │            │   │
│  │  │ name       │           │ rating     │            │   │
│  │  │ pronouns   │           │ tags       │            │   │
│  │  │ gender     │           │ likes      │            │   │
│  │  │ orientation│           │ comments   │            │   │
│  │  │ city       │           │ flagged    │            │   │
│  │  │ verified   │           │ author     │            │   │
│  │  └────────────┘           └────────────┘            │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└───────────────────────────┬───────────────────────────────┘
                            │
                            ↓
                    ┌───────────────┐
                    │   MongoDB     │
                    │   Database    │
                    └───────────────┘
```

## Data Flow Examples

### 1. User Registration Flow
```
User Input (Mobile)
    ↓
    └─→ POST /api/auth/register
            ↓
            ├─→ Validate input
            ├─→ Hash password (bcrypt)
            ├─→ Create User in MongoDB
            ├─→ Generate JWT token
            ↓
        Return token + user data
            ↓
        Store in mobile app
            ↓
        Navigate to main app
```

### 2. Vibe Check Flow
```
User pastes message (Mobile)
    ↓
    └─→ POST /api/vibe-check/analyze
            ↓
            ├─→ Authenticate user (JWT)
            ├─→ Run sentiment analysis
            ├─→ Check red flag keywords
            ├─→ Check green flag keywords
            ├─→ Calculate vibe score
            ├─→ Generate recommendations
            ↓
        Return analysis results
            ↓
        Display color-coded UI
            ↓
        Show recommendations
```

### 3. Post Creation Flow
```
User creates post (Mobile)
    ↓
    └─→ POST /api/posts
            ↓
            ├─→ Authenticate user (JWT)
            ├─→ Validate post data
            ├─→ Create Post in MongoDB
            ├─→ Link to user (anonymously if selected)
            ↓
        Return created post
            ↓
        Update feed in mobile app
```

### 4. Feed Loading Flow
```
User opens feed (Mobile)
    ↓
    └─→ GET /api/posts?page=1&type=all
            ↓
            ├─→ Query MongoDB with filters
            ├─→ Populate author data
            ├─→ Sort by date
            ├─→ Paginate results
            ↓
        Return posts array
            ↓
        Render in feed UI
```

## Security Layers

```
┌─────────────────────────────────┐
│      Client-Side Security        │
│  • Secure storage for tokens     │
│  • Input validation              │
│  • HTTPS only                    │
└──────────────┬──────────────────┘
               ↓
┌─────────────────────────────────┐
│      Transport Security          │
│  • HTTPS/TLS encryption          │
│  • Bearer token auth             │
└──────────────┬──────────────────┘
               ↓
┌─────────────────────────────────┐
│      API Security               │
│  • JWT verification              │
│  • Rate limiting                 │
│  • Input sanitization            │
└──────────────┬──────────────────┘
               ↓
┌─────────────────────────────────┐
│      Database Security           │
│  • Password hashing (bcrypt)     │
│  • Connection encryption         │
│  • Access control                │
└─────────────────────────────────┘
```

## Feature Matrix

| Feature | Mobile | Backend | Database | Status |
|---------|--------|---------|----------|--------|
| Authentication | ✅ UI | ✅ JWT | ✅ Users | Complete |
| User Profiles | ✅ UI | ✅ API | ✅ Schema | Complete |
| Feed (Spill/Sip/Brew) | ✅ UI | ✅ API | ✅ Posts | Complete |
| Search & Filter | ✅ UI | ✅ API | ✅ Query | Complete |
| Vibe Check AI | ✅ UI | ✅ Analysis | N/A | Complete |
| Like/Comment | ✅ UI | ✅ API | ✅ Embedded | Complete |
| Flagging | ✅ UI | ✅ API | ✅ Field | Complete |
| Safe Tips Hub | ✅ UI | N/A | N/A | Complete |
| OAuth (Apple/Google) | 🔄 Placeholder | 🔄 Stub | N/A | Future |
| Real-time Chat | ❌ | ❌ | ❌ | Future |
| Push Notifications | ❌ | ❌ | ❌ | Future |

## Component Architecture (Mobile)

```
app/
├── _layout.tsx (Root)
│   └── Stack Navigator
│       ├── index.tsx (Onboarding)
│       ├── auth/ (Auth Stack)
│       │   ├── login.tsx
│       │   └── signup.tsx
│       └── (tabs)/ (Main Stack)
│           ├── _layout.tsx (Tab Navigator)
│           ├── feed.tsx
│           ├── search.tsx
│           ├── vibe-check.tsx
│           └── profile.tsx
```

## API Structure

```
/api
├── /auth
│   ├── POST /register
│   ├── POST /login
│   ├── POST /oauth/apple
│   └── POST /oauth/google
├── /users
│   ├── GET  /profile (protected)
│   ├── PUT  /profile (protected)
│   └── GET  /search
├── /posts
│   ├── GET  / (feed)
│   ├── POST / (protected)
│   ├── POST /:id/like (protected)
│   ├── POST /:id/comment (protected)
│   └── POST /:id/flag (protected)
└── /vibe-check
    ├── POST /analyze (protected)
    └── GET  /history (protected)
```

## Technology Stack Summary

### Frontend Stack
```
React Native 0.74
    ↓
Expo Framework ~51.0
    ↓
Expo Router ~3.5 (Navigation)
    ↓
NativeWind 2.0 (TailwindCSS)
    ↓
Axios (HTTP Client)
```

### Backend Stack
```
Node.js 20+
    ↓
Express.js 4.18
    ↓
Mongoose 8.0 (ODM)
    ↓
JWT + bcryptjs (Auth)
    ↓
Sentiment Analysis (AI)
```

### Database
```
MongoDB
    ├── Users Collection
    └── Posts Collection
```

---

This architecture provides:
- ✅ Scalability through modular design
- ✅ Security through multiple layers
- ✅ Maintainability through clear separation
- ✅ Extensibility for future features

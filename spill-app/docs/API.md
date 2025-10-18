# API Documentation

## Base URL
```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

## Rate Limiting

The API implements rate limiting to prevent abuse:

- **General endpoints**: 100 requests per 15 minutes per IP
- **Authentication endpoints**: 5 requests per 15 minutes per IP

When rate limit is exceeded, the API returns:
```json
{
  "error": "Too many requests from this IP, please try again later."
}
```

Headers include rate limit information:
```
RateLimit-Limit: 100
RateLimit-Remaining: 95
RateLimit-Reset: 1234567890
```

## Health Check

**GET** `/health`

Check API server status (no authentication required).

Response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123456
}
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

### Register User
**POST** `/auth/register`

Request body:
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "Alex",
  "pronouns": "they/them",
  "genderIdentity": "Non-binary",
  "orientation": "Queer",
  "city": "Brooklyn, NY"
}
```

Response:
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "email": "user@example.com",
    "name": "Alex",
    "pronouns": "they/them",
    ...
  }
}
```

### Login
**POST** `/auth/login`

Request body:
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

Response: Same as register

## Users

### Get Profile
**GET** `/users/profile` (Protected)

Response:
```json
{
  "_id": "...",
  "email": "user@example.com",
  "name": "Alex",
  "pronouns": "they/them",
  "genderIdentity": "Non-binary",
  "orientation": "Queer",
  "city": "Brooklyn, NY",
  "verifiedLGBTQ": true,
  "badges": ["verified"]
}
```

### Update Profile
**PUT** `/users/profile` (Protected)

Request body (all fields optional):
```json
{
  "name": "Alex Smith",
  "bio": "Just living my truth",
  "socialLinks": {
    "instagram": "@alex"
  }
}
```

### Search Users
**GET** `/users/search?query=alex&city=Brooklyn`

Query parameters:
- `query`: Search by name
- `pronouns`: Filter by pronouns
- `city`: Filter by city
- `genderIdentity`: Filter by gender identity

## Posts

### Get Feed
**GET** `/posts?type=spill&page=1&limit=20`

Query parameters:
- `type`: Filter by type (spill, sip, brew)
- `tags`: Comma-separated tags
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

Response:
```json
{
  "posts": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

### Create Post
**POST** `/posts` (Protected)

Request body:
```json
{
  "type": "spill",
  "content": "Had an amazing date! Very respectful...",
  "rating": 5,
  "reviewedPerson": {
    "name": "Jamie",
    "platform": "Hinge"
  },
  "tags": ["green-flag", "respectful"],
  "authorAnonymous": true
}
```

### Like Post
**POST** `/posts/:id/like` (Protected)

Toggles like/unlike for the post.

### Add Comment
**POST** `/posts/:id/comment` (Protected)

Request body:
```json
{
  "content": "I had a similar experience!"
}
```

### Flag Post
**POST** `/posts/:id/flag` (Protected)

Request body:
```json
{
  "reason": "Hate speech"
}
```

## Vibe Check

### Analyze Message
**POST** `/vibe-check/analyze` (Protected)

Request body:
```json
{
  "message": "Hey! I noticed your pronouns in your bio. I want to make sure I'm being respectful. How are you?"
}
```

Response:
```json
{
  "score": 85,
  "level": "good",
  "color": "#00FF88",
  "indicators": [
    {
      "type": "positive",
      "text": "Respectful language detected: respect, pronouns",
      "icon": "✅"
    }
  ],
  "recommendations": [
    "This conversation shows positive signs",
    "Continue with normal caution"
  ],
  "analysis": {
    "sentimentScore": 3,
    "comparative": 0.15,
    "redFlagsDetected": 0,
    "greenFlagsDetected": 2
  }
}
```

## Error Responses

All endpoints may return error responses:

```json
{
  "error": "Error message here"
}
```

Common status codes:
- 400: Bad request (validation error)
- 401: Unauthorized (missing or invalid token)
- 404: Resource not found
- 500: Server error

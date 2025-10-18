# Contributing to Spill

Thank you for your interest in contributing to Spill! This document provides guidelines for contributing to this LGBTQ+ focused dating review app.

## Code of Conduct

Spill is built for and by the LGBTQ+ community. All contributors must:

- Respect all gender identities, sexual orientations, and expressions
- Use inclusive language
- Be respectful of differing viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, Node version, etc.)

### Suggesting Features

Feature suggestions are welcome! Please:

- Use a clear and descriptive title
- Provide detailed description of the proposed feature
- Explain why this feature would be useful to the community
- Consider how it aligns with Spill's mission of safety and inclusivity

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages**
   ```bash
   git commit -m "Add: Amazing feature for better safety"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

## Development Setup

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Setup Steps

1. Clone your fork:
```bash
git clone https://github.com/your-username/DimeClark.git
cd DimeClark/spill-app
```

2. Install dependencies:
```bash
# Backend
cd backend
npm install

# Mobile
cd ../mobile
npm install
```

3. Set up environment:
```bash
cd backend
cp .env.example .env
# Edit .env with your settings
```

4. Start development:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Mobile
cd mobile
npm start
```

## Coding Standards

### JavaScript/TypeScript
- Use TypeScript for type safety where possible
- Follow ES6+ conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### React Native Components
- Use functional components with hooks
- Keep components modular and reusable
- Use StyleSheet for styling
- Follow the established design system

### Example Component:
```tsx
/**
 * Component description
 * @param {Props} props - Component props
 */
const MyComponent = ({ title, onPress }: Props) => {
  const [state, setState] = useState(false);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
```

### Backend Code
- Use async/await for asynchronous operations
- Implement proper error handling
- Validate all user inputs
- Use middleware for common operations
- Document API endpoints

### Example Route:
```javascript
/**
 * Create a new post
 * @route POST /api/posts
 * @access Protected
 */
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { type, content, rating } = req.body;
    
    // Validation
    if (!type || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Create post
    const post = new Post({ type, content, rating, author: req.userId });
    await post.save();
    
    res.status(201).json({ post });
  } catch (error) {
    console.error('Post creation error:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});
```

## Testing

### Testing Requirements
All new features must include tests. We use:
- **Backend**: Jest + Supertest for API testing
- **Mobile**: Jest + React Native Testing Library

### Testing Guidelines
- Write tests for new features
- Ensure existing tests pass
- Test edge cases and error handling
- Aim for >80% code coverage
- Mock external dependencies
- Test authentication flows

### Running Tests
```bash
# Backend tests
cd backend
npm test                 # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # With coverage

# Mobile tests
cd mobile
npm test                 # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # With coverage
```

### Writing Tests

**Backend Example:**
```javascript
describe('POST /api/posts', () => {
  it('should create a new post', async () => {
    const response = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({ type: 'spill', content: 'Test' });

    expect(response.status).toBe(201);
    expect(response.body.post).toHaveProperty('_id');
  });
});
```

**Mobile Example:**
```typescript
import { render, fireEvent } from '@testing-library/react-native';
import PostCard from '../components/PostCard';

describe('PostCard', () => {
  it('should render post content', () => {
    const { getByText } = render(
      <PostCard post={{ content: 'Test post' }} />
    );
    expect(getByText('Test post')).toBeTruthy();
  });
});
```

See [docs/TESTING.md](./docs/TESTING.md) for detailed testing guide.

## Design Guidelines

### Follow the Design System
- Use established colors (Neon Pink, Lavender, Deep Black)
- Follow spacing and typography guidelines
- Maintain consistent component styles
- Reference `/docs/DESIGN.md` for specifications

### Accessibility
- Ensure minimum touch target size (44x44px)
- Maintain proper color contrast
- Support screen readers where possible
- Test with various font sizes

## Database Changes

### MongoDB Schema Updates
- Document schema changes in PR description
- Provide migration scripts if needed
- Consider backward compatibility
- Test with existing data

### Example Migration:
```javascript
// Migration script for adding new field
db.users.updateMany(
  { verifiedLGBTQ: { $exists: false } },
  { $set: { verifiedLGBTQ: false } }
);
```

## API Changes

### Adding New Endpoints
- Follow RESTful conventions
- Document in `/docs/API.md`
- Include request/response examples
- Implement proper authentication

### Versioning
- Consider API versioning for breaking changes
- Use `/api/v1/` prefix for versioned endpoints

## Commit Message Guidelines

Use clear, descriptive commit messages:

- **Add:** New feature or file
- **Update:** Modify existing feature
- **Fix:** Bug fix
- **Remove:** Delete feature or file
- **Refactor:** Code restructuring
- **Docs:** Documentation changes

Examples:
```
Add: Vibe check AI analysis feature
Fix: Login authentication token expiration
Update: Profile screen with new badges
Docs: API endpoint documentation for posts
```

## Community Guidelines

### Content to Include
- Features that enhance safety
- Improvements to inclusivity
- Better user experience
- Performance optimizations
- Bug fixes

### Content to Avoid
- Features that could enable harassment
- Privacy-compromising features
- Discriminatory functionality
- Unnecessary complexity

## Review Process

1. **Automated checks** run on PR
2. **Code review** by maintainers
3. **Testing** in development environment
4. **Feedback** and requested changes
5. **Approval** and merge

## Recognition

Contributors will be:
- Listed in the README
- Acknowledged in release notes
- Part of the Spill community

## Questions?

- **Documentation**: Check `/docs` folder
- **Issues**: Open a GitHub issue
- **Discussions**: Use GitHub Discussions
- **Contact**: Email dimeclark5@gmail.com

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping make Spill a safer, more inclusive platform for the LGBTQ+ community! 💜

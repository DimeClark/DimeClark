# Deployment Guide - Spill App

This guide covers deploying the Spill backend API and mobile app to production.

## Table of Contents
- [Backend Deployment](#backend-deployment)
  - [Heroku](#heroku)
  - [Render](#render)
  - [AWS](#aws)
- [Mobile App Publishing](#mobile-app-publishing)
  - [iOS App Store](#ios-app-store)
  - [Google Play Store](#google-play-store)
- [Environment Configuration](#environment-configuration)
- [Monitoring & Maintenance](#monitoring--maintenance)

## Backend Deployment

### Prerequisites
- MongoDB database (MongoDB Atlas recommended for production)
- Domain name (optional but recommended)
- SSL certificate (automatically provided by most platforms)

### Heroku

Heroku offers easy deployment with automatic SSL and scaling options.

#### Steps:

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create a new Heroku app**
   ```bash
   cd spill-app/backend
   heroku create spill-app-api
   ```

4. **Set environment variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your-mongodb-atlas-uri
   heroku config:set JWT_SECRET=your-secure-jwt-secret
   heroku config:set SENTRY_DSN=your-sentry-dsn
   ```

5. **Deploy the app**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push heroku main
   ```

6. **Verify deployment**
   ```bash
   heroku open
   heroku logs --tail
   ```

#### Cost: Free tier available, paid plans start at $7/month

### Render

Render provides modern cloud hosting with automatic deployments from Git.

#### Steps:

1. **Create account at [render.com](https://render.com)**

2. **Create new Web Service**
   - Connect your GitHub repository
   - Select `spill-app/backend` as the root directory
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Configure environment variables**
   In the Render dashboard, add:
   - `NODE_ENV=production`
   - `MONGODB_URI=your-mongodb-atlas-uri`
   - `JWT_SECRET=your-secure-jwt-secret`
   - `SENTRY_DSN=your-sentry-dsn`
   - `PORT=3000`

4. **Deploy**
   - Render automatically deploys on every push to your main branch
   - View logs in the dashboard

#### Cost: Free tier available, paid plans start at $7/month

### AWS

AWS provides the most flexibility and scalability options.

#### Option 1: Elastic Beanstalk (Easier)

1. **Install AWS CLI and EB CLI**
   ```bash
   pip install awsebcli
   ```

2. **Initialize Elastic Beanstalk**
   ```bash
   cd spill-app/backend
   eb init
   ```

3. **Create environment**
   ```bash
   eb create spill-app-production
   ```

4. **Set environment variables**
   ```bash
   eb setenv NODE_ENV=production MONGODB_URI=your-uri JWT_SECRET=your-secret
   ```

5. **Deploy**
   ```bash
   eb deploy
   ```

#### Option 2: EC2 + Docker (More Control)

1. **Create Dockerfile** (see Docker section below)

2. **Launch EC2 instance**
   - Use Ubuntu 22.04 LTS
   - Configure security groups (port 80, 443, 22)

3. **Install Docker on EC2**
   ```bash
   sudo apt update
   sudo apt install docker.io
   sudo systemctl start docker
   ```

4. **Deploy with Docker**
   ```bash
   docker build -t spill-api .
   docker run -d -p 80:3000 \
     -e NODE_ENV=production \
     -e MONGODB_URI=your-uri \
     -e JWT_SECRET=your-secret \
     spill-api
   ```

5. **Set up reverse proxy with Nginx** (optional)
   - Install Nginx
   - Configure SSL with Let's Encrypt

#### Cost: EC2 starts at ~$5/month (t2.micro), Elastic Beanstalk similar

## Mobile App Publishing

### Prerequisites
- Apple Developer Account ($99/year for iOS)
- Google Play Developer Account ($25 one-time for Android)
- Expo account (free)

### Building for Production

#### Using EAS (Expo Application Services) - Recommended

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**
   ```bash
   eas login
   ```

3. **Configure EAS**
   ```bash
   cd spill-app/mobile
   eas build:configure
   ```

4. **Update app.json**
   ```json
   {
     "expo": {
       "name": "Spill",
       "slug": "spill-app",
       "version": "1.0.0",
       "ios": {
         "bundleIdentifier": "com.dimeclark.spill",
         "buildNumber": "1"
       },
       "android": {
         "package": "com.dimeclark.spill",
         "versionCode": 1
       }
     }
   }
   ```

### iOS App Store

1. **Create app in App Store Connect**
   - Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
   - Create new app
   - Fill in app information, screenshots, description

2. **Build iOS app**
   ```bash
   eas build --platform ios
   ```

3. **Submit for review**
   ```bash
   eas submit --platform ios
   ```

4. **Review checklist**
   - App description mentions LGBTQ+ community focus
   - Screenshots show key features
   - Privacy policy URL configured
   - Terms of service available
   - Content rating set appropriately
   - Age rating: 17+ (due to dating content)

5. **Wait for Apple review** (typically 1-3 days)

### Google Play Store

1. **Create app in Google Play Console**
   - Go to [play.google.com/console](https://play.google.com/console)
   - Create application
   - Fill in store listing

2. **Build Android app**
   ```bash
   eas build --platform android
   ```

3. **Submit for review**
   ```bash
   eas submit --platform android
   ```

4. **Review checklist**
   - Store listing complete with screenshots
   - Content rating questionnaire filled
   - Privacy policy URL configured
   - App content declaration completed
   - Target audience: 18+ (dating content)

5. **Wait for Google review** (typically 1-7 days)

### Alternative: Expo Go (Development/Testing)

For quick testing without building native apps:
```bash
cd spill-app/mobile
npm start
```
Users can scan QR code with Expo Go app.

**Note:** Not suitable for production as it doesn't support all features.

## Environment Configuration

### Production Environment Variables

#### Backend (.env)
```env
NODE_ENV=production
PORT=3000

# MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/spill-app

# Strong JWT secret (generate with: openssl rand -base64 32)
JWT_SECRET=your-super-secure-random-string-here

# Sentry DSN for error tracking
SENTRY_DSN=https://your-key@sentry.io/your-project-id

# Optional: OpenAI API key
OPENAI_API_KEY=sk-your-openai-key
```

#### Mobile App (app.json extra config)
```json
{
  "expo": {
    "extra": {
      "apiUrl": "https://your-api-domain.com",
      "sentryDsn": "https://your-key@sentry.io/your-project-id",
      "environment": "production"
    }
  }
}
```

### MongoDB Atlas Setup

1. **Create MongoDB Atlas account** at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Create a cluster**
   - Choose free tier (M0) or production tier
   - Select region closest to your API server

3. **Configure database access**
   - Create database user with password
   - Note username and password for connection string

4. **Configure network access**
   - Add IP address `0.0.0.0/0` (all IPs) for production
   - Or add specific IPs of your backend servers

5. **Get connection string**
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

## Docker Deployment

### Backend Dockerfile

Create `/spill-app/backend/Dockerfile`:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### Docker Compose

Create `/spill-app/docker-compose.yml`:

```yaml
version: '3.8'

services:
  api:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=${MONGODB_URI}
      - JWT_SECRET=${JWT_SECRET}
      - SENTRY_DSN=${SENTRY_DSN}
    restart: unless-stopped

  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    restart: unless-stopped

volumes:
  mongo-data:
```

### Deploy with Docker:
```bash
docker-compose up -d
```

## Monitoring & Maintenance

### Sentry Setup

1. **Create Sentry account** at [sentry.io](https://sentry.io)

2. **Create projects**
   - One project for backend (Node.js)
   - One project for mobile app (React Native)

3. **Get DSN keys**
   - Copy DSN for each project
   - Add to environment variables

4. **Configure alerts**
   - Set up email/Slack notifications
   - Configure issue assignment rules

### Health Monitoring

Backend includes `/health` endpoint:
```bash
curl https://your-api-domain.com/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123456
}
```

Use this for:
- Uptime monitoring (UptimeRobot, Pingdom)
- Load balancer health checks
- Automated alerts

### Logging

Backend logs are available through:
- Heroku: `heroku logs --tail`
- Render: Dashboard → Logs
- AWS: CloudWatch Logs

### Backup Strategy

1. **MongoDB backups**
   - Atlas automatic backups (enabled by default)
   - Or manual backups: `mongodump --uri="your-mongodb-uri"`

2. **Backup frequency**
   - Daily automated backups
   - Keep 7 days of backups minimum

3. **Test restore process** monthly

### Scaling Considerations

As your app grows:

1. **Database**
   - Upgrade MongoDB Atlas tier
   - Enable sharding for large datasets
   - Add read replicas

2. **API**
   - Horizontal scaling (multiple instances)
   - Load balancer (AWS ALB, Heroku auto-scaling)
   - CDN for static assets

3. **Monitoring**
   - Application Performance Monitoring (APM)
   - Database query performance
   - API response times

## Post-Deployment Checklist

- [ ] Backend API accessible at production URL
- [ ] MongoDB connection working
- [ ] All environment variables configured
- [ ] Sentry error tracking active
- [ ] Health endpoint responding
- [ ] HTTPS/SSL enabled
- [ ] CORS configured for mobile app
- [ ] Mobile app builds successfully
- [ ] iOS app submitted to App Store
- [ ] Android app submitted to Play Store
- [ ] Privacy policy page live
- [ ] Terms of service page live
- [ ] Support email configured
- [ ] Monitoring alerts configured
- [ ] Backup strategy implemented

## Support & Troubleshooting

### Common Issues

**MongoDB connection timeout**
- Check network access whitelist in Atlas
- Verify connection string is correct
- Ensure IP addresses are allowed

**JWT token errors**
- Verify JWT_SECRET matches between environments
- Check token expiration settings
- Ensure Authorization header format is correct

**CORS errors**
- Configure CORS to allow mobile app domain
- In production, specify exact origins instead of `*`

**App store rejections**
- Ensure privacy policy is accessible
- Add app content warnings if needed
- Test on actual devices before submission

### Getting Help

- GitHub Issues: [Create an issue](https://github.com/DimeClark/DimeClark/issues)
- Email: dimeclark5@gmail.com
- Documentation: See other docs in `/docs` folder

## Continuous Deployment

Set up CI/CD pipeline with GitHub Actions:

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: |
          cd spill-app/backend
          npm install
          npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "spill-app-api"
          heroku_email: ${{secrets.HEROKU_EMAIL}}
```

---

**Last Updated:** 2024
**Maintained by:** DimeClark

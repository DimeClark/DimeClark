#!/bin/bash

# Spill App Setup Script
# Automated setup for backend and mobile development

set -e

echo "🏳️‍🌈 Welcome to Spill App Setup"
echo "================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check Node.js
echo "Checking prerequisites..."
if ! command_exists node; then
    echo -e "${RED}✗ Node.js is not installed${NC}"
    echo "Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}✗ Node.js version must be 18 or higher (current: $(node -v))${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v)${NC}"

# Check npm
if ! command_exists npm; then
    echo -e "${RED}✗ npm is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm $(npm -v)${NC}"

# Check MongoDB
if ! command_exists mongod && ! command_exists mongo; then
    echo -e "${YELLOW}⚠ MongoDB not found locally${NC}"
    echo "  You can:"
    echo "  1. Install MongoDB locally: https://www.mongodb.com/try/download/community"
    echo "  2. Use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas"
    echo ""
fi

# Check Docker (optional)
if command_exists docker; then
    echo -e "${GREEN}✓ Docker $(docker -v | cut -d' ' -f3 | cut -d',' -f1)${NC}"
else
    echo -e "${YELLOW}⚠ Docker not installed (optional)${NC}"
fi

echo ""
echo "Installing dependencies..."
echo "=========================="

# Install backend dependencies
echo ""
echo "📦 Installing backend dependencies..."
cd backend
if [ -f "package-lock.json" ]; then
    npm ci
else
    npm install
fi
echo -e "${GREEN}✓ Backend dependencies installed${NC}"

# Install mobile dependencies
echo ""
echo "📱 Installing mobile app dependencies..."
cd ../mobile
if [ -f "package-lock.json" ]; then
    npm ci --legacy-peer-deps
else
    npm install --legacy-peer-deps
fi
echo -e "${GREEN}✓ Mobile dependencies installed${NC}"

# Setup environment files
echo ""
echo "Setting up environment files..."
echo "==============================="

cd ../backend
if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo -e "${GREEN}✓ Created backend/.env${NC}"
    echo -e "${YELLOW}⚠ Please update backend/.env with your configuration${NC}"
else
    echo -e "${GREEN}✓ backend/.env already exists${NC}"
fi

# Create MongoDB data directory for local development
mkdir -p ../../mongodb-data
echo -e "${GREEN}✓ Created MongoDB data directory${NC}"

echo ""
echo "✨ Setup complete!"
echo "=================="
echo ""
echo "Next steps:"
echo ""
echo "1. Configure backend environment:"
echo "   ${YELLOW}cd spill-app/backend${NC}"
echo "   ${YELLOW}nano .env${NC} (or use your preferred editor)"
echo ""
echo "2. Start MongoDB (if running locally):"
echo "   ${YELLOW}mongod --dbpath ./mongodb-data${NC}"
echo ""
echo "   OR use MongoDB Atlas and update MONGODB_URI in .env"
echo ""
echo "3. Start the backend API:"
echo "   ${YELLOW}cd spill-app/backend${NC}"
echo "   ${YELLOW}npm run dev${NC}"
echo ""
echo "4. In a new terminal, start the mobile app:"
echo "   ${YELLOW}cd spill-app/mobile${NC}"
echo "   ${YELLOW}npm start${NC}"
echo ""
echo "5. Run tests:"
echo "   ${YELLOW}cd spill-app/backend && npm test${NC}"
echo "   ${YELLOW}cd spill-app/mobile && npm test${NC}"
echo ""
echo "6. Using Docker (alternative):"
echo "   ${YELLOW}cd spill-app${NC}"
echo "   ${YELLOW}docker-compose up${NC}"
echo ""
echo "For more information, see:"
echo "  - README.md"
echo "  - QUICKSTART.md"
echo "  - docs/DEPLOYMENT.md"
echo "  - docs/TESTING.md"
echo ""
echo "Made with 💜 for the Girls and Gays by DimeClark"

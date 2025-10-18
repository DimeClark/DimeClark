#!/bin/bash

# Spill App Verification Script
# Checks that all required files and configurations are in place

set -e

echo "🔍 Spill App Setup Verification"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
checks_passed=0
checks_failed=0
checks_total=0

# Function to check file existence
check_file() {
    checks_total=$((checks_total + 1))
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        checks_passed=$((checks_passed + 1))
        return 0
    else
        echo -e "${RED}✗${NC} $1 - MISSING"
        checks_failed=$((checks_failed + 1))
        return 1
    fi
}

# Function to check directory existence
check_dir() {
    checks_total=$((checks_total + 1))
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1/"
        checks_passed=$((checks_passed + 1))
        return 0
    else
        echo -e "${RED}✗${NC} $1/ - MISSING"
        checks_failed=$((checks_failed + 1))
        return 1
    fi
}

echo "📂 Checking Backend Structure..."
echo "--------------------------------"
check_dir "backend"
check_file "backend/package.json"
check_file "backend/server.js"
check_file "backend/.env.example"
check_file "backend/Dockerfile"
check_file "backend/.dockerignore"

echo ""
echo "📦 Checking Backend Modules..."
check_dir "backend/models"
check_file "backend/models/User.js"
check_file "backend/models/Post.js"

echo ""
check_dir "backend/routes"
check_file "backend/routes/auth.js"
check_file "backend/routes/users.js"
check_file "backend/routes/posts.js"
check_file "backend/routes/vibe-check.js"

echo ""
check_dir "backend/middleware"
check_file "backend/middleware/auth.js"

echo ""
echo "🧪 Checking Backend Tests..."
check_dir "backend/tests"
check_file "backend/tests/auth.test.js"
check_file "backend/tests/posts.test.js"
check_file "backend/tests/users.test.js"
check_file "backend/tests/vibe-check.test.js"

echo ""
echo "📱 Checking Mobile Structure..."
echo "--------------------------------"
check_dir "mobile"
check_file "mobile/package.json"
check_file "mobile/app.json"
check_file "mobile/eas.json"

echo ""
check_dir "mobile/app"
check_file "mobile/app/index.tsx"
check_file "mobile/app/_layout.tsx"

echo ""
check_dir "mobile/app/auth"
check_file "mobile/app/auth/login.tsx"
check_file "mobile/app/auth/signup.tsx"

echo ""
check_dir "mobile/app/(tabs)"
check_file "mobile/app/(tabs)/_layout.tsx"
check_file "mobile/app/(tabs)/feed.tsx"
check_file "mobile/app/(tabs)/search.tsx"
check_file "mobile/app/(tabs)/vibe-check.tsx"
check_file "mobile/app/(tabs)/profile.tsx"

echo ""
check_dir "mobile/services"
check_file "mobile/services/sentry.ts"

echo ""
check_dir "mobile/__tests__"
check_file "mobile/__tests__/App.test.tsx"

echo ""
echo "📚 Checking Documentation..."
echo "--------------------------------"
check_file "README.md"
check_file "QUICKSTART.md"
check_file "CONTRIBUTING.md"
check_file "IMPLEMENTATION_COMPLETE.md"
check_file "COMPLETION_SUMMARY.md"
check_file "QUICK_REFERENCE.md"

echo ""
check_dir "docs"
check_file "docs/API.md"
check_file "docs/ARCHITECTURE.md"
check_file "docs/DESIGN.md"
check_file "docs/DEPLOYMENT.md"
check_file "docs/TESTING.md"
check_file "docs/PRODUCTION_CHECKLIST.md"
check_file "docs/COMMUNITY_GUIDELINES.md"
check_file "docs/UI_SCREENSHOTS.md"

echo ""
echo "🐳 Checking Docker Configuration..."
echo "--------------------------------"
check_file "docker-compose.yml"

echo ""
echo "⚙️  Checking Scripts..."
echo "--------------------------------"
check_file "setup.sh"
if [ -x "setup.sh" ]; then
    echo -e "${GREEN}✓${NC} setup.sh is executable"
else
    echo -e "${YELLOW}⚠${NC} setup.sh is not executable (run: chmod +x setup.sh)"
fi

echo ""
echo "🔧 Checking Configuration Files..."
echo "--------------------------------"
check_file "package.json"
check_file ".gitignore"

echo ""
echo "================================"
echo "Verification Results"
echo "================================"
echo -e "Passed: ${GREEN}${checks_passed}${NC}"
echo -e "Failed: ${RED}${checks_failed}${NC}"
echo -e "Total:  ${checks_total}"
echo ""

if [ $checks_failed -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed!${NC}"
    echo ""
    echo "🎉 Your Spill app setup is complete and verified!"
    echo ""
    echo "Next steps:"
    echo "  1. Run: ./setup.sh (if you haven't already)"
    echo "  2. Configure backend/.env with your settings"
    echo "  3. Start backend: cd backend && npm run dev"
    echo "  4. Start mobile: cd mobile && npm start"
    echo ""
    exit 0
else
    echo -e "${RED}✗ Some checks failed!${NC}"
    echo ""
    echo "Please ensure all required files are present."
    echo "Run ./setup.sh to install dependencies if needed."
    echo ""
    exit 1
fi

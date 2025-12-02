#!/bin/bash

# Texas Five Fueling - Visual Display Diagnostic Script
# Run this to quickly assess the current state of the project

echo "=================================================="
echo "🔍 TEXAS FIVE FUELING - DIAGNOSTIC REPORT"
echo "=================================================="
echo ""

# Check current branch
echo "📌 Git Branch:"
git branch --show-current
echo ""

# Check last commits
echo "📝 Last 3 Commits:"
git log --oneline -3
echo ""

# Check for uncommitted changes
echo "🔄 Uncommitted Changes:"
git status --short
echo ""

# Check if images exist
echo "📸 Hero Images Status:"
if [ -f "public/images/hero-bg.jpg" ]; then
    echo "  ✅ hero-bg.jpg exists ($(du -h public/images/hero-bg.jpg | cut -f1))"
else
    echo "  ❌ hero-bg.jpg MISSING"
fi

if [ -f "public/images/hero-bg-mobile.jpg" ]; then
    echo "  ✅ hero-bg-mobile.jpg exists ($(du -h public/images/hero-bg-mobile.jpg | cut -f1))"
else
    echo "  ❌ hero-bg-mobile.jpg MISSING"
fi

if [ -f "public/images/hero-bg-tablet.jpg" ]; then
    echo "  ✅ hero-bg-tablet.jpg exists ($(du -h public/images/hero-bg-tablet.jpg | cut -f1))"
else
    echo "  ❌ hero-bg-tablet.jpg MISSING"
fi
echo ""

# Check if images are in Git
echo "🗂️  Images in Git:"
git ls-files public/images/hero-bg*.jpg | wc -l | xargs echo "  Number of hero images tracked:"
echo ""

# Check critical files exist
echo "📄 Critical Files:"
[ -f "components/sections/Hero.tsx" ] && echo "  ✅ Hero.tsx" || echo "  ❌ Hero.tsx MISSING"
[ -f "app/layout.tsx" ] && echo "  ✅ layout.tsx" || echo "  ❌ layout.tsx MISSING"
[ -f "app/globals.css" ] && echo "  ✅ globals.css" || echo "  ❌ globals.css MISSING"
[ -f "tailwind.config.ts" ] && echo "  ✅ tailwind.config.ts" || echo "  ❌ tailwind.config.ts MISSING"
[ -f "next.config.js" ] && echo "  ✅ next.config.js" || echo "  ❌ next.config.js MISSING"
echo ""

# Check dependencies installed
echo "📦 Dependencies:"
if [ -d "node_modules" ]; then
    echo "  ✅ node_modules exists"
    echo "  Packages installed: $(ls node_modules | wc -l)"
else
    echo "  ❌ node_modules MISSING - Run: npm install"
fi
echo ""

# Check Next.js version
echo "🔧 Next.js Version:"
npm list next | grep next@ || echo "  ❌ Unable to determine Next.js version"
echo ""

# Check for .next build directory
echo "🏗️  Build Status:"
if [ -d ".next" ]; then
    echo "  ✅ .next directory exists (built at: $(stat -f "%Sm" .next))"
else
    echo "  ⚠️  .next directory not found - Run: npm run build"
fi
echo ""

# Check environment variables (without exposing values)
echo "🔐 Environment Variables:"
if [ -f ".env" ]; then
    echo "  ✅ .env file exists"
    grep -c "NEXT_PUBLIC_SUPABASE_URL" .env > /dev/null && echo "  ✅ NEXT_PUBLIC_SUPABASE_URL" || echo "  ❌ NEXT_PUBLIC_SUPABASE_URL missing"
    grep -c "NEXT_PUBLIC_SUPABASE_ANON_KEY" .env > /dev/null && echo "  ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY" || echo "  ❌ NEXT_PUBLIC_SUPABASE_ANON_KEY missing"
    grep -c "SUPABASE_SERVICE_ROLE_KEY" .env > /dev/null && echo "  ✅ SUPABASE_SERVICE_ROLE_KEY" || echo "  ❌ SUPABASE_SERVICE_ROLE_KEY missing"
    grep -c "AWS_ACCESS_KEY_ID" .env > /dev/null && echo "  ✅ AWS_ACCESS_KEY_ID" || echo "  ❌ AWS_ACCESS_KEY_ID missing"
    grep -c "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY" .env > /dev/null && echo "  ✅ NEXT_PUBLIC_GOOGLE_MAPS_API_KEY" || echo "  ❌ NEXT_PUBLIC_GOOGLE_MAPS_API_KEY missing"
else
    echo "  ❌ .env file MISSING"
fi
echo ""

echo "=================================================="
echo "📋 RECOMMENDED NEXT STEPS:"
echo "=================================================="
echo ""
echo "1. Test local development:"
echo "   npm run dev"
echo ""
echo "2. Open browser to: http://localhost:3000"
echo ""
echo "3. Compare to: preview-images/idea-preview.png"
echo ""
echo "4. Test production build:"
echo "   npm run build && npm start"
echo ""
echo "5. Check browser console for errors (F12)"
echo ""
echo "6. Read: CRITICAL_HANDOFF_VISUAL_ISSUES.md"
echo ""
echo "=================================================="


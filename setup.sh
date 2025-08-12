#!/bin/bash

# REI Deal Machine - Quick Setup Script
echo "🏠 REI Deal Machine - Setup Script"
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js detected: $(node -v)"

# Create project structure
echo "📁 Creating project structure..."

# Create directories
mkdir -p public/icons
mkdir -p public/screenshots
mkdir -p src
mkdir -p .github/workflows

# Create placeholder icon files (you'll need to replace with actual icons)
echo "🎨 Creating placeholder icons..."
for size in 72 96 128 144 152 192 384 512; do
    touch "public/icons/icon-${size}x${size}.png"
done

echo "📦 Installing dependencies..."
npm install

echo "🔧 Creating .env file for configuration..."
cat > .env << EOL
# REI Deal Machine Configuration
VITE_APP_TITLE=REI Deal Machine
VITE_MONTHLY_GOAL=35000
VITE_DEFAULT_ASSIGNMENT_FEE=15000
VITE_MAO_PERCENTAGE=0.7
EOL

echo "🚀 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Generate proper PWA icons at: https://www.pwabuilder.com/imageGenerator"
echo "2. Replace placeholder icons in public/icons/"
echo "3. Run 'npm run dev' to start development server"
echo "4. Open http://localhost:5173 in your browser"
echo ""
echo "To build for production: npm run build"
echo "To deploy to Vercel: npx vercel"
echo ""
echo "Happy wholesaling! 💰"

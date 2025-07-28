# Development Setup Guide

## Prerequisites

### Required Software
1. **asdf Version Manager**
   - Install asdf: https://asdf-vm.com/guide/getting-started.html
   - Enables automatic Node.js and pnpm version management

2. **Git**
   - For version control and repository management

### System Requirements
- **Operating System**: macOS, Linux, or Windows (with WSL)
- **Memory**: Minimum 4GB RAM, 8GB recommended
- **Storage**: At least 2GB free space for dependencies

## Environment Setup

### 1. Install asdf (if not already installed)

**macOS (using Homebrew)**:
```bash
brew install asdf
echo -e "\n. $(brew --prefix asdf)/libexec/asdf.sh" >> ~/.zshrc
source ~/.zshrc
```

**Linux**:
```bash
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.14.0
echo '. "$HOME/.asdf/asdf.sh"' >> ~/.bashrc
source ~/.bashrc
```

### 2. Install asdf Plugins
```bash
# Add Node.js plugin
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git

# Add pnpm plugin  
asdf plugin add pnpm
```

### 3. Project Setup

#### Clone Repository
```bash
git clone <repository-url>
cd project
```

#### Install Tool Versions
The project includes a `.tool-versions` file that specifies:
- Node.js: 20.10.0
- pnpm: 8.15.7

```bash
# Install versions specified in .tool-versions
asdf install
```

#### Install Dependencies
```bash
pnpm install
```

#### Start Development Server
```bash
pnpm run dev
```

The application will be available at `http://localhost:3000` (or next available port).

## Development Commands

### Basic Commands
```bash
# Start development server
pnpm run dev

# Build for production
pnpm run build

# Start production server
pnpm start

# Run type checking
pnpm run type-check

# Clean build cache
rm -rf .next
```

### Useful Development Commands
```bash
# Install new dependency
pnpm add <package-name>

# Install dev dependency
pnpm add -D <package-name>

# Remove dependency
pnpm remove <package-name>

# Update dependencies
pnpm update

# Check outdated packages
pnpm outdated
```

## Project Configuration Files

### `.tool-versions`
Specifies exact versions of development tools:
```
nodejs 20.10.0
pnpm 8.15.7
```

### `package.json`
Contains project metadata and dependencies:
```json
{
  "name": "potato-warehouse-management",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

### `next.config.js`
Next.js configuration:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true
}

module.exports = nextConfig
```

### `tailwind.config.js`
Tailwind CSS configuration:
```javascript
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
        accent: '#F59E0B',
        warning: '#EF4444'
      }
    }
  },
  plugins: []
}
```

### `tsconfig.json`
TypeScript configuration:
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

## Development Workflow

### 1. Feature Development
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
# Edit files...

# Test changes
pnpm run dev

# Commit changes
git add .
git commit -m "Add new feature"

# Push to repository
git push origin feature/new-feature
```

### 2. Code Quality Checks
```bash
# Type checking
npx tsc --noEmit

# Check for compilation errors
pnpm run build
```

### 3. Build and Deploy
```bash
# Production build
pnpm run build

# Test production build locally
pnpm start
```

## Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
**Problem**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use different port
pnpm run dev -- -p 3001
```

#### 2. Module Not Found Errors
**Problem**: `Cannot find module` errors

**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

#### 3. Build Cache Issues
**Problem**: Compilation errors after changes

**Solution**:
```bash
# Clear Next.js cache
rm -rf .next
pnpm run dev
```

#### 4. Version Mismatches
**Problem**: Different Node.js/pnpm versions

**Solution**:
```bash
# Ensure correct versions
asdf current
asdf install  # if versions don't match .tool-versions
```

#### 5. TypeScript Errors
**Problem**: Type checking failures

**Solution**:
```bash
# Run type checker
npx tsc --noEmit

# Check specific file
npx tsc --noEmit path/to/file.tsx
```

### Getting Help

#### Log Files
- Next.js logs: Check terminal output
- Browser console: Check for client-side errors
- Network tab: Check API requests

#### Debug Mode
```bash
# Enable debug mode
DEBUG=* pnpm run dev

# Next.js specific debugging
DEBUG=next:* pnpm run dev
```

#### Useful Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## IDE Setup

### VS Code Extensions (Recommended)
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "ms-vscode.vscode-json"
  ]
}
```

### VS Code Settings
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## Environment Variables (Future)

### Development Environment
Create `.env.local` file:
```env
# Database
DATABASE_URL="file:./dev.db"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Production Environment
```env
# Production database
DATABASE_URL="file:./production.db"

# Production URL
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

## Security Considerations

### Development Security
- Never commit sensitive data
- Use environment variables for configuration
- Validate all user inputs
- Sanitize data before processing

### Production Security
- Enable HTTPS
- Implement authentication
- Regular security updates
- Data backup procedures

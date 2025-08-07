# Contributing to Viewpts

Thank you for your interest in contributing to Viewpts! This document provides guidelines and information for developers.

## Development Setup

### Prerequisites
- Node.js 18+ and npm
- Git

### Getting Started

1. Clone the repository:
```bash
git clone https://github.com/mtrunzo12/viewpts-next.git
cd viewpts-next
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Fill in your API keys in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `NYT_API_KEY` - New York Times API key
- `TWITTER_BEARER_TOKEN` - Twitter API bearer token
- `REDDIT_CLIENT_ID` and `REDDIT_CLIENT_SECRET` - Reddit API credentials
- `YOUTUBE_API_KEY` - YouTube Data API key
- `OPENAI_API_KEY` - OpenAI API key

5. Start the development server:
```bash
npm run dev
```

## Development Workflow

### Code Quality
- Run `npm run lint` to check for linting issues
- Run `npm run type-check` to verify TypeScript compilation
- Pre-commit hooks automatically run linting and formatting

### Testing
- Test your changes locally with `npm run dev`
- Verify responsive design across desktop, tablet, and mobile
- Test authentication flow with Supabase
- Ensure API integrations return real data

### Building
- Run `npm run build` to create a production build
- Verify the build completes without errors

## Project Structure

```
src/
├── app/                 # Next.js 14 App Router pages
│   ├── api/            # API routes for external integrations
│   ├── login/          # Authentication pages
│   └── layout.tsx      # Root layout
├── components/         # React components
│   └── ui/            # Reusable UI components
└── lib/               # Utility functions and configurations
    └── supabase/      # Supabase client configurations
```

## Coding Standards

### TypeScript
- Use TypeScript for all new code
- Prefer interfaces over types for object shapes
- Use path aliases (`@/`) instead of relative imports

### React
- Use functional components with hooks
- Follow the existing component patterns
- Ensure components are responsive and accessible

### Styling
- Use Tailwind CSS for styling
- Follow the existing design system
- Ensure mobile-first responsive design

## API Integrations

The platform integrates with multiple external APIs:
- **Supabase**: Authentication and database
- **OpenAI**: AI-powered content analysis
- **New York Times**: News articles
- **Twitter**: Social media content
- **Reddit**: Discussion threads
- **YouTube**: Video content

## Deployment

The application is designed to be deployed on Vercel with the following environment variables configured in the deployment settings.

## Getting Help

If you have questions or need help:
1. Check existing issues on GitHub
2. Create a new issue with detailed information
3. Follow the issue template for bug reports or feature requests

## License

This project is private and proprietary. Please respect the codebase and do not share or distribute without permission.

# Viewpts - Next.js Debate Platform

A modern debate platform built with Next.js 14, featuring real-time content aggregation from multiple APIs, user authentication, and a Reddit-style interface for discussions.

## 🚀 Features

- **Multi-API Content Aggregation**: Pulls trending content from NYT, Twitter, Reddit, YouTube, and OpenAI
- **User Authentication**: Secure email-based auth with Supabase
- **Modern UI**: Built with ShadCN UI components and Tailwind CSS
- **Infinite Scroll**: Smooth content loading experience
- **Responsive Design**: Works on desktop and mobile
- **API-First Architecture**: Secure backend routes for all external integrations

## 📋 Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Supabase account and project
- API keys for: NYT, Twitter, Reddit, YouTube, OpenAI

## 🛠️ Setup Instructions

### 1. Clone and Install

```bash
git clone https://github.com/mtrunzo12/viewpts-next.git
cd viewpts-next
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Keys
NYT_API_KEY=your_nyt_api_key_here
TWITTER_BEARER_TOKEN=your_twitter_bearer_token_here
REDDIT_CLIENT_ID=your_reddit_client_id_here
REDDIT_SECRET=your_reddit_secret_here
YOUTUBE_API_KEY=your_youtube_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Next.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### 3. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your URL and keys
3. Enable Email authentication in Authentication > Settings
4. Optional: Configure social providers (Google, GitHub, etc.)

### 4. API Keys Setup

#### New York Times API
1. Visit [developer.nytimes.com](https://developer.nytimes.com)
2. Create an account and request an API key
3. Enable the Article Search API

#### Twitter API
1. Apply for Twitter Developer access at [developer.twitter.com](https://developer.twitter.com)
2. Create a new app and generate Bearer Token
3. Ensure you have v2 API access

#### Reddit API
1. Go to [reddit.com/prefs/apps](https://reddit.com/prefs/apps)
2. Create a new application (script type)
3. Note the client ID and secret

#### YouTube API
1. Visit [console.developers.google.com](https://console.developers.google.com)
2. Create a project and enable YouTube Data API v3
3. Generate an API key

#### OpenAI API
1. Sign up at [platform.openai.com](https://platform.openai.com)
2. Generate an API key from the API keys section
3. Ensure you have credits/billing set up

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🎯 How to Use the Application

### For Regular Users

#### 1. Account Creation
- Visit the login page
- Click "Don't have an account? Sign up"
- Enter your email and password
- Check your email for confirmation link
- Click the link to verify your account

#### 2. Browsing Content
- **Home Page**: View trending topics from all sources
- **Search**: Use the search bar to find specific topics
- **Infinite Scroll**: Scroll down to load more content automatically
- **Source Filtering**: Content is tagged by source (NYT, Twitter, Reddit, YouTube)

#### 3. Interacting with Content
- Click on cards to view full content
- Use voting buttons (when implemented)
- Leave comments on discussions
- Share interesting content

### For Content Creators

#### 1. Starting Discussions
- Create new debate topics
- Add context and background information
- Tag relevant categories
- Set discussion parameters

#### 2. Moderating Discussions
- Monitor comment quality
- Flag inappropriate content
- Guide conversation direction
- Summarize key points

## 👑 Admin Functions

### Admin Access
Admins are configured in Supabase. To make a user an admin:

1. Go to your Supabase dashboard
2. Navigate to Authentication > Users
3. Find the user and edit their metadata
4. Add: `{"role": "admin"}`

### Admin Capabilities

#### 1. Content Management
```javascript
// Check if user is admin in components
const { data: { user } } = await supabase.auth.getUser()
const isAdmin = user?.user_metadata?.role === 'admin'
```

#### 2. User Management
- View all registered users
- Suspend/unsuspend accounts
- Reset user passwords
- Manage user roles

#### 3. API Management
- Monitor API usage and limits
- Update API keys through environment variables
- View API response logs
- Configure rate limiting

#### 4. Content Moderation
- Remove inappropriate content
- Ban users for violations
- Set community guidelines
- Manage reported content

### Admin Dashboard Access
```bash
# Access admin routes (when implemented)
/admin/dashboard
/admin/users
/admin/content
/admin/analytics
```

## ✏️ Editing and Customization

### 1. UI Customization

#### Colors and Themes
Edit `tailwind.config.js`:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // Your custom colors
        }
      }
    }
  }
}
```

#### Components
ShadCN UI components are in `src/components/ui/`. Customize:
- `button.tsx` - Button styles
- `card.tsx` - Card layouts
- `input.tsx` - Form inputs

### 2. Adding New API Sources

#### Step 1: Create API Route
```bash
# Create new API route file
touch src/app/api/newsource/route.ts
```

#### Step 2: Implement Route
```typescript
// src/app/api/newsource/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  
  // Your API implementation
  const response = await fetch(`https://api.newsource.com/search?q=${query}`, {
    headers: {
      'Authorization': `Bearer ${process.env.NEWSOURCE_API_KEY}`
    }
  });
  
  const data = await response.json();
  return NextResponse.json({ source: 'newsource', data });
}
```

#### Step 3: Add to Frontend
Update `src/lib/mockData.ts` to include new source in trending topics.

### 3. Database Schema Changes

#### Adding New Tables
```sql
-- In Supabase SQL editor
CREATE TABLE debates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  creator_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Row Level Security
```sql
-- Enable RLS
ALTER TABLE debates ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view all debates" ON debates
  FOR SELECT USING (true);

CREATE POLICY "Users can create debates" ON debates
  FOR INSERT WITH CHECK (auth.uid() = creator_id);
```

### 4. Adding New Features

#### Real-time Features
```typescript
// Subscribe to real-time changes
const supabase = createClient()

useEffect(() => {
  const subscription = supabase
    .channel('debates')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'debates' },
      (payload) => {
        // Handle real-time updates
      }
    )
    .subscribe()

  return () => subscription.unsubscribe()
}, [])
```

#### Custom Hooks
```typescript
// src/hooks/useDebates.ts
export function useDebates() {
  const [debates, setDebates] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Your custom logic
  
  return { debates, loading, createDebate, updateDebate }
}
```

## 🚀 Deployment

### Vercel Deployment

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

2. **Environment Variables**
   - Go to Vercel dashboard
   - Navigate to your project settings
   - Add all environment variables from `.env.local`
   - Ensure `NEXTAUTH_URL` points to your Vercel domain

3. **Domain Configuration**
   - Add custom domain in Vercel settings
   - Update `NEXTAUTH_URL` to match your domain
   - Update Supabase redirect URLs

### Alternative Deployments

#### Docker
```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

#### Railway/Render
- Connect GitHub repository
- Set environment variables
- Deploy automatically on push

## 🔧 Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks

# Database
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.types.ts

# Testing
npm run test         # Run tests (when implemented)
npm run test:e2e     # Run E2E tests (when implemented)
```

## 📁 Project Structure

```
viewpts-next/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   ├── login/          # Auth pages
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── ui/            # ShadCN UI components
│   │   ├── Header.tsx     # Navigation
│   │   └── TrendingCard.tsx
│   ├── lib/               # Utilities
│   │   ├── supabase/      # Supabase clients
│   │   └── mockData.ts    # Sample data
│   └── middleware.ts      # Auth middleware
├── public/                # Static assets
├── .env.local            # Environment variables
└── README.md             # This file
```

## 🐛 Troubleshooting

### Common Issues

#### 1. API Rate Limits
- Monitor API usage in respective dashboards
- Implement caching for frequently requested data
- Add rate limiting to your API routes

#### 2. Authentication Issues
- Check Supabase URL and keys
- Verify email confirmation settings
- Ensure redirect URLs are correct

#### 3. Build Errors
- Check TypeScript errors: `npm run type-check`
- Verify all environment variables are set
- Clear Next.js cache: `rm -rf .next`

#### 4. Database Connection
- Verify Supabase project is active
- Check RLS policies
- Ensure service role key has proper permissions

### Getting Help

1. **Check Logs**
   - Browser console for frontend errors
   - Vercel function logs for API issues
   - Supabase logs for database problems

2. **Community Support**
   - Next.js Discord
   - Supabase Discord
   - GitHub Issues

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

**Built with ❤️ by @mtrunzo12**

*Link to Devin run: https://app.devin.ai/sessions/abff97de89c5495c9ea037fed246d2ed*

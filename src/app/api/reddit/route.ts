import { NextRequest, NextResponse } from 'next/server';
import { apiCache, getCacheKey } from '../../../lib/cache';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || 'trending';
    const subreddit = searchParams.get('subreddit') || 'all';
    
    const cacheKey = getCacheKey('reddit', { q: query, subreddit });
    const cachedData = apiCache.get(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData);
    }
    
    const clientId = process.env.REDDIT_CLIENT_ID;
    const clientSecret = process.env.REDDIT_SECRET;
    
    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { error: 'Reddit credentials not configured' },
        { status: 500 }
      );
    }

    const authResponse = await fetch('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Viewpts/1.0.0',
      },
      body: 'grant_type=client_credentials',
    });

    if (!authResponse.ok) {
      throw new Error(`Reddit auth error: ${authResponse.status}`);
    }

    const authData = await authResponse.json();
    const accessToken = authData.access_token;

    const searchResponse = await fetch(
      `https://oauth.reddit.com/r/${subreddit}/search?q=${encodeURIComponent(query)}&sort=hot&limit=10`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'User-Agent': 'Viewpts/1.0.0',
        },
      }
    );

    if (!searchResponse.ok) {
      throw new Error(`Reddit API error: ${searchResponse.status}`);
    }

    const data = await searchResponse.json();
    
    const result = {
      source: 'reddit',
      posts: data.data?.children?.map((child: { data: unknown }) => child.data) || [],
      subreddit: subreddit
    };
    
    apiCache.set(cacheKey, result, 15);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Reddit API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Reddit data' },
      { status: 500 }
    );
  }
}

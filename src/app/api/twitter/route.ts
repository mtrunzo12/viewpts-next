import { NextRequest, NextResponse } from 'next/server';
import { apiCache, getCacheKey } from '../../../lib/cache';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || 'trending';
    
    const cacheKey = getCacheKey('twitter', { q: query });
    const cachedData = apiCache.get(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData);
    }
    
    const bearerToken = process.env.TWITTER_BEARER_TOKEN;
    if (!bearerToken) {
      return NextResponse.json(
        { error: 'Twitter Bearer Token not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(query)}&max_results=10&tweet.fields=created_at,author_id,public_metrics`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Twitter API error: ${response.status}`);
    }

    const data = await response.json();
    
    const result = {
      source: 'twitter',
      tweets: data.data || [],
      meta: data.meta || {}
    };
    
    apiCache.set(cacheKey, result, 15);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Twitter API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Twitter data' },
      { status: 500 }
    );
  }
}

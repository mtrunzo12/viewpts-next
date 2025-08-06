import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || 'trending';
    
    const apiKey = process.env.NYT_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'NYT API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent(query)}&api-key=${apiKey}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`NYT API error: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json({
      source: 'nyt',
      articles: data.response?.docs?.slice(0, 10) || [],
      total: data.response?.meta?.hits || 0
    });
  } catch (error) {
    console.error('NYT API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch NYT articles' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || 'trending';
    
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'YouTube API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=10&key=${apiKey}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json({
      source: 'youtube',
      videos: data.items || [],
      pageInfo: data.pageInfo || {}
    });
  } catch (error) {
    console.error('YouTube API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch YouTube data' },
      { status: 500 }
    );
  }
}

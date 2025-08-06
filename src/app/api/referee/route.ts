import { NextRequest, NextResponse } from 'next/server';

interface RefereeRequest {
  argument: string;
  topic: string;
  side: string;
  context?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: RefereeRequest = await request.json();
    const { argument, topic, side, context } = body;
    
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are an AI referee for debates. Your role is to:
1. Fact-check arguments for accuracy
2. Identify logical fallacies
3. Suggest counterpoints
4. Rate argument strength (1-10)
5. Ensure fair and balanced discourse

Be objective, cite sources when possible, and encourage healthy debate.`
          },
          {
            role: 'user',
            content: `Topic: ${topic}
Side: ${side}
Argument: ${argument}
${context ? `Context: ${context}` : ''}

Please analyze this argument and provide:
1. Fact-check results
2. Logical strength assessment
3. Potential counterpoints
4. Overall score (1-10)`
          }
        ],
        max_tokens: 800,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`OpenAI API error ${response.status}:`, errorData);
      
      if (response.status === 429) {
        return NextResponse.json(
          { error: 'AI Referee temporarily unavailable due to rate limits.' },
          { status: 429 }
        );
      } else if (response.status === 403 || errorData.includes('insufficient_quota')) {
        return NextResponse.json(
          { error: 'AI Referee temporarily unavailable due to quota limits.' },
          { status: 403 }
        );
      } else {
        return NextResponse.json(
          { error: `AI Referee error: ${response.status}` },
          { status: response.status }
        );
      }
    }

    const data = await response.json();
    
    return NextResponse.json({
      source: 'ai_referee',
      analysis: data.choices?.[0]?.message?.content || '',
      timestamp: new Date().toISOString(),
      usage: data.usage || {}
    });
  } catch (error) {
    console.error('AI Referee error:', error);
    return NextResponse.json(
      { 
        error: 'AI Referee service temporarily unavailable.',
        fallback: 'Manual moderation will be applied to this argument.'
      },
      { status: 500 }
    );
  }
}

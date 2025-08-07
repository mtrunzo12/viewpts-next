import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, content } = body;
    
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
            content: 'You are a helpful assistant that summarizes content and provides balanced perspectives on topics.'
          },
          {
            role: 'user',
            content: prompt || `Please provide a balanced summary of the following content: ${content}`
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`OpenAI API error ${response.status}:`, errorData);
      
      if (response.status === 429) {
        return NextResponse.json(
          { error: 'OpenAI API rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      } else if (response.status === 401) {
        return NextResponse.json(
          { error: 'OpenAI API authentication failed. Please check your API key.' },
          { status: 401 }
        );
      } else if (response.status === 403 || errorData.includes('insufficient_quota')) {
        return NextResponse.json(
          { 
            error: 'OpenAI API quota exceeded. Please check your billing and usage limits.',
            fallback: {
              argumentsFor: [
                "AI can provide personalized learning experiences tailored to individual student needs",
                "24/7 availability ensures students can learn at their own pace and schedule",
                "Consistent delivery of curriculum without human bias or mood variations"
              ],
              argumentsAgainst: [
                "Human teachers provide emotional support and mentorship that AI cannot replicate",
                "Critical thinking and creativity are better fostered through human interaction",
                "Social skills development requires human-to-human communication"
              ],
              analysis: "This debate centers on the balance between technological efficiency and human connection in education. While AI offers scalability and personalization, human teachers provide irreplaceable emotional intelligence and social development opportunities."
            }
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { error: `OpenAI API error: ${response.status} - ${errorData}` },
          { status: response.status }
        );
      }
    }

    const data = await response.json();
    
    return NextResponse.json({
      source: 'openai',
      summary: data.choices?.[0]?.message?.content || '',
      usage: data.usage || {}
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { 
        error: 'OpenAI service temporarily unavailable. This may be due to quota limits or service issues.',
        fallback: 'Please try again later or contact support if the issue persists.'
      },
      { status: 500 }
    );
  }
}

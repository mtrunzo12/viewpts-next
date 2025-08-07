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

    try {
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
        
        return NextResponse.json(
          { 
            error: 'OpenAI API quota/rate limit exceeded. Using fallback content.',
            fallback: {
              argumentsFor: [
                "Strong evidence supports this position with documented benefits",
                "Multiple studies and expert opinions validate this perspective", 
                "Real-world implementation has shown positive outcomes"
              ],
              argumentsAgainst: [
                "Significant concerns have been raised by experts in the field",
                "Alternative approaches may be more effective or sustainable",
                "Potential negative consequences need careful consideration"
              ],
              analysis: "This topic involves complex considerations with valid arguments on multiple sides. A balanced approach requires weighing the evidence, considering different stakeholder perspectives, and evaluating both short-term and long-term implications."
            }
          },
          { status: 200 }
        );
      }

      const data = await response.json();
      
      return NextResponse.json({
        source: 'openai',
        summary: data.choices?.[0]?.message?.content || '',
        usage: data.usage || {}
      });
    } catch (fetchError) {
      console.error('OpenAI fetch error:', fetchError);
      return NextResponse.json(
        { 
          error: 'OpenAI API temporarily unavailable. Using fallback content.',
          fallback: {
            argumentsFor: [
              "Strong evidence supports this position with documented benefits",
              "Multiple studies and expert opinions validate this perspective", 
              "Real-world implementation has shown positive outcomes"
            ],
            argumentsAgainst: [
              "Significant concerns have been raised by experts in the field",
              "Alternative approaches may be more effective or sustainable",
              "Potential negative consequences need careful consideration"
            ],
            analysis: "This topic involves complex considerations with valid arguments on multiple sides. A balanced approach requires weighing the evidence, considering different stakeholder perspectives, and evaluating both short-term and long-term implications."
          }
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { 
        error: 'OpenAI service temporarily unavailable. Using fallback content.',
        fallback: {
          argumentsFor: [
            "Strong evidence supports this position with documented benefits",
            "Multiple studies and expert opinions validate this perspective", 
            "Real-world implementation has shown positive outcomes"
          ],
          argumentsAgainst: [
            "Significant concerns have been raised by experts in the field",
            "Alternative approaches may be more effective or sustainable",
            "Potential negative consequences need careful consideration"
          ],
          analysis: "This topic involves complex considerations with valid arguments on multiple sides. A balanced approach requires weighing the evidence, considering different stakeholder perspectives, and evaluating both short-term and long-term implications."
        }
      },
      { status: 200 }
    );
  }
}

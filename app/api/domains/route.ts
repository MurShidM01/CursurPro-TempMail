import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const apiKey = process.env.IMPROVMX_API_KEY;
    
    if (!apiKey) {
      console.error('IMPROVMX_API_KEY is not configured in environment variables');
      return NextResponse.json(
        { 
          error: 'IMPROVMX_API_KEY not configured. Please add it to your .env.local file.',
          domains: []
        },
        { status: 500 }
      );
    }

    const response = await axios.get('https://api.improvmx.com/v3/domains', {
      headers: {
        'Authorization': `Basic ${Buffer.from(`api:${apiKey}`).toString('base64')}`,
      },
    });

    // Log the response for debugging
    console.log('ImprovMX API Response:', {
      status: response.status,
      domainsCount: response.data?.domains?.length || 0,
      hasDomains: !!response.data?.domains
    });

    // Ensure we always return a domains array
    if (!response.data.domains) {
      response.data.domains = [];
    }

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error fetching domains:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    const errorMessage = error.response?.data?.error 
      || error.message 
      || 'Failed to fetch domains from ImprovMX API';
    
    return NextResponse.json(
      { 
        error: errorMessage,
        domains: []
      },
      { status: error.response?.status || 500 }
    );
  }
}


import { NextResponse } from 'next/server';
import axios from 'axios';
import { google } from 'googleapis';

async function getGmailEmail(): Promise<string> {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URI
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  });

  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
  const profile = await gmail.users.getProfile({ userId: 'me' });
  
  return profile.data.emailAddress || '';
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.IMPROVMX_API_KEY;
    const { domain, alias } = await request.json();

    if (!apiKey) {
      return NextResponse.json(
        { error: 'IMPROVMX_API_KEY not configured' },
        { status: 500 }
      );
    }

    if (!domain || !alias) {
      return NextResponse.json(
        { error: 'Domain and alias are required' },
        { status: 400 }
      );
    }

    const authHeader = {
      'Authorization': `Basic ${Buffer.from(`api:${apiKey}`).toString('base64')}`,
    };

    // First, check if the alias already exists
    try {
      const domainsResponse = await axios.get('https://api.improvmx.com/v3/domains', {
        headers: authHeader,
      });

      const domainData = domainsResponse.data.domains?.find((d: any) => d.domain === domain);
      
      if (domainData && domainData.aliases) {
        const existingAlias = domainData.aliases.find((a: any) => a.alias === alias);
        
        if (existingAlias) {
          // Alias already exists, return it
          return NextResponse.json({
            alias: {
              alias: existingAlias.alias,
              forward: existingAlias.forward,
              id: existingAlias.id,
            },
            success: true,
            existing: true,
          });
        }
      }
    } catch (checkError) {
      console.log('Could not check existing aliases, proceeding to create:', checkError);
    }

    // Get Gmail email address to forward to
    const forwardEmail = await getGmailEmail();
    
    if (!forwardEmail) {
      return NextResponse.json(
        { error: 'Failed to get Gmail email address. Please check your Gmail OAuth configuration.' },
        { status: 500 }
      );
    }

    // Alias doesn't exist, create it
    const response = await axios.post(
      `https://api.improvmx.com/v3/domains/${domain}/aliases`,
      { alias, forward: forwardEmail },
      {
        headers: {
          ...authHeader,
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json({
      ...response.data,
      existing: false,
    });
  } catch (error: any) {
    console.error('Error creating alias:', error);
    
    // If error is because alias already exists, try to fetch it
    if (error.response?.status === 400 && error.response?.data?.errors?.alias) {
      try {
        const domainsResponse = await axios.get('https://api.improvmx.com/v3/domains', {
          headers: {
            'Authorization': `Basic ${Buffer.from(`api:${process.env.IMPROVMX_API_KEY}`).toString('base64')}`,
          },
        });

        const domainData = domainsResponse.data.domains?.find((d: any) => d.domain === domain);
        
        if (domainData && domainData.aliases) {
          const existingAlias = domainData.aliases.find((a: any) => a.alias === alias);
          
          if (existingAlias) {
            return NextResponse.json({
              alias: {
                alias: existingAlias.alias,
                forward: existingAlias.forward,
                id: existingAlias.id,
              },
              success: true,
              existing: true,
            });
          }
        }
      } catch (fetchError) {
        console.error('Error fetching existing alias:', fetchError);
      }
    }
    
    // Log more details about the error
    if (error.response?.data) {
      console.error('Error response data:', error.response.data);
    }
    
    return NextResponse.json(
      { 
        error: error.response?.data?.errors || error.response?.data?.error || error.message || 'Failed to create alias',
        details: error.response?.data 
      },
      { status: error.response?.status || 500 }
    );
  }
}


import { NextResponse } from 'next/server';
import axios from 'axios';
import { google } from 'googleapis';
import { deleteOldAliases } from '../cleanup/deleteOldAliases';
import { getRandomExistingAlias } from './getRandomExisting';

async function getGmailEmail(): Promise<string> {
  // Option 1: Use static forwarding email from environment variable
  const staticEmail = process.env.FORWARD_EMAIL;
  if (staticEmail) {
    return staticEmail;
  }

  // Option 2: Try OAuth (original method)
  try {
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
  } catch (error) {
    console.error('Gmail OAuth error:', error);
    throw new Error('Gmail OAuth token expired or invalid. Please set FORWARD_EMAIL in .env or regenerate GMAIL_REFRESH_TOKEN');
  }
}

export async function POST(request: Request) {
  let domain: string | undefined;
  let alias: string | undefined;
  let excludeEmails: string[] = [];
  
  try {
    const apiKey = process.env.IMPROVMX_API_KEY;
    const body = await request.json();
    domain = body.domain;
    alias = body.alias;
    excludeEmails = body.excludeEmails || []; // Emails already shown to user

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

    // Alias doesn't exist, try to create it
    try {
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
    } catch (createError: any) {
      // Check if error is about alias limit (handle both string and array formats)
      const errorData = createError.response?.data;
      let isLimitError = false;
      
      if (createError.response?.status === 400 && errorData?.errors?.alias) {
        const aliasError = errorData.errors.alias;
        // Check if it's a string or array containing "limit" or "upgrade"
        if (typeof aliasError === 'string') {
          isLimitError = aliasError.toLowerCase().includes('limit') || 
                        aliasError.toLowerCase().includes('upgrade');
        } else if (Array.isArray(aliasError) && aliasError.length > 0) {
          const errorMessage = aliasError[0]?.toLowerCase() || '';
          isLimitError = errorMessage.includes('limit') || 
                        errorMessage.includes('upgrade') ||
                        errorMessage.includes('limited to');
        }
      }
      
      // If error is about alias limit, try to cleanup old aliases first
      if (isLimitError) {
        console.log('Alias limit reached, attempting to cleanup old aliases...');
        
        try {
          // Try to delete old aliases (older than 24 hours)
          const cleanupResult = await deleteOldAliases(domain, 24 * 60 * 60 * 1000);
          
          console.log('Cleanup result:', cleanupResult);
          
          // If we deleted some aliases, try creating again
          if (cleanupResult.deleted > 0) {
            const retryResponse = await axios.post(
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
              ...retryResponse.data,
              existing: false,
              cleanedUp: cleanupResult.deleted,
            });
          } else {
            // If cleanup didn't delete anything, try deleting more (oldest 50% if > 20 aliases)
            console.log('No old aliases found, attempting to delete oldest aliases...');
            const aggressiveCleanup = await deleteOldAliases(domain, 0); // 0 means delete oldest ones
            if (aggressiveCleanup.deleted > 0) {
              const retryResponse = await axios.post(
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
                ...retryResponse.data,
                existing: false,
                cleanedUp: aggressiveCleanup.deleted,
              });
            } else {
              // Cleanup didn't work, try to return a random existing alias
              console.log('Cleanup failed, attempting to return random existing alias...');
              try {
                const randomAlias = await getRandomExistingAlias(domain, excludeEmails);
                if (randomAlias) {
                  return NextResponse.json({
                    alias: {
                      alias: randomAlias.split('@')[0],
                      forward: forwardEmail,
                    },
                    success: true,
                    existing: true,
                    reused: true, // Flag to indicate this is a reused alias
                    email: randomAlias
                  });
                }
              } catch (randomError) {
                console.error('Error getting random existing alias:', randomError);
              }
            }
          }
        } catch (cleanupError) {
          console.error('Error during cleanup:', cleanupError);
          // Try to return a random existing alias as fallback
          try {
            const randomAlias = await getRandomExistingAlias(domain, excludeEmails);
            if (randomAlias) {
              return NextResponse.json({
                alias: {
                  alias: randomAlias.split('@')[0],
                  forward: forwardEmail,
                },
                success: true,
                existing: true,
                reused: true,
                email: randomAlias
              });
            }
          } catch (randomError) {
            console.error('Error getting random existing alias:', randomError);
          }
          // Continue to throw original error
        }
      } else {
        // Not a limit error, but still try to return existing alias if available
        // This handles cases where we can't create but have existing aliases
        try {
          const randomAlias = await getRandomExistingAlias(domain, excludeEmails);
          if (randomAlias) {
            return NextResponse.json({
              alias: {
                alias: randomAlias.split('@')[0],
                forward: forwardEmail,
              },
              success: true,
              existing: true,
              reused: true,
              email: randomAlias
            });
          }
        } catch (randomError) {
          console.error('Error getting random existing alias:', randomError);
        }
      }
      
      // Re-throw the original error if cleanup didn't help or failed
      throw createError;
    }
  } catch (error: any) {
    console.error('Error creating alias:', error);
    
    // If error is because alias already exists, try to fetch it
    if (error.response?.status === 400 && error.response?.data?.errors?.alias && domain && alias) {
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


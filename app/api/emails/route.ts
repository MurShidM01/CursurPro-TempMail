import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const emailAddress = searchParams.get('email');

    if (!emailAddress) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      process.env.GMAIL_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Extract alias and domain from email address
    const [alias, domain] = emailAddress.split('@');
    
    // Multiple search strategies to find forwarded emails
    // 1. Search by "to" field (original recipient)
    // 2. Search by "Delivered-To" header (where it was forwarded)
    // 3. Search in all folders including spam
    // 4. Search by subject containing the alias (some forwarders add this)
    
    const queries = [
      `to:${emailAddress}`, // Direct match
      `"Delivered-To: ${emailAddress}"`, // Delivered-To header
      `"X-Forwarded-To: ${emailAddress}"`, // X-Forwarded-To header
      `"Envelope-To: ${emailAddress}"`, // Envelope-To header
      `subject:"${alias}"`, // Subject might contain alias
    ];

    // Try searching in inbox first, then spam
    let allMessages: any[] = [];
    const messageIds = new Set<string>();

    // Search in inbox (including spam with -in:spam removed, we'll search spam separately)
    for (const query of queries) {
      try {
        const response = await gmail.users.messages.list({
          userId: 'me',
          q: `${query} -in:spam`, // Exclude spam for now
          maxResults: 50,
        });
        
        if (response.data.messages) {
          response.data.messages.forEach((msg) => {
            if (msg.id && !messageIds.has(msg.id)) {
              messageIds.add(msg.id);
              allMessages.push(msg);
            }
          });
        }
      } catch (err) {
        console.error(`Error with query ${query}:`, err);
      }
    }

    // Also search in spam folder specifically
    for (const query of queries) {
      try {
        const response = await gmail.users.messages.list({
          userId: 'me',
          q: `${query} in:spam`, // Search in spam
          maxResults: 50,
        });
        
        if (response.data.messages) {
          response.data.messages.forEach((msg) => {
            if (msg.id && !messageIds.has(msg.id)) {
              messageIds.add(msg.id);
              allMessages.push(msg);
            }
          });
        }
      } catch (err) {
        console.error(`Error searching spam with query ${query}:`, err);
      }
    }

    // If no results, try a broader search - get recent emails and filter
    if (allMessages.length === 0) {
      try {
        const recentResponse = await gmail.users.messages.list({
          userId: 'me',
          q: 'newer_than:7d', // Last 7 days
          maxResults: 100,
        });

        if (recentResponse.data.messages) {
          // Fetch and check each message
          const recentMessages = await Promise.all(
            recentResponse.data.messages.slice(0, 50).map(async (msg) => {
              try {
                const fullMsg = await gmail.users.messages.get({
                  userId: 'me',
                  id: msg.id!,
                  format: 'metadata',
                  metadataHeaders: ['Delivered-To', 'X-Forwarded-To', 'Envelope-To', 'To', 'Subject'],
                });

                const headers = fullMsg.data.payload?.headers || [];
                const getHeader = (name: string) =>
                  headers.find((h) => h.name?.toLowerCase() === name.toLowerCase())?.value || '';

                const deliveredTo = getHeader('Delivered-To');
                const forwardedTo = getHeader('X-Forwarded-To');
                const envelopeTo = getHeader('Envelope-To');
                const to = getHeader('To');
                const subject = getHeader('Subject');

                // Check if this email is for our temp address
                if (
                  deliveredTo?.includes(emailAddress) ||
                  forwardedTo?.includes(emailAddress) ||
                  envelopeTo?.includes(emailAddress) ||
                  to?.includes(emailAddress) ||
                  subject?.includes(alias)
                ) {
                  return msg;
                }
                return null;
              } catch (err) {
                return null;
              }
            })
          );

          recentMessages.forEach((msg) => {
            if (msg && msg.id && !messageIds.has(msg.id)) {
              messageIds.add(msg.id);
              allMessages.push(msg);
            }
          });
        }
      } catch (err) {
        console.error('Error with broad search:', err);
      }
    }

    // Fetch full email details
    const emails = await Promise.all(
      allMessages.map(async (message) => {
        try {
          const msg = await gmail.users.messages.get({
            userId: 'me',
            id: message.id!,
            format: 'full',
          });

          const headers = msg.data.payload?.headers || [];
          const getHeader = (name: string) =>
            headers.find((h) => h.name?.toLowerCase() === name.toLowerCase())?.value || '';

          // Check labelIds to see if it's in spam
          const labelIds = msg.data.labelIds || [];
          const isSpam = labelIds.includes('SPAM');

          return {
            id: message.id,
            subject: getHeader('Subject'),
            from: getHeader('From'),
            date: getHeader('Date'),
            snippet: msg.data.snippet,
            body: extractBody(msg.data.payload),
            isSpam: isSpam,
            deliveredTo: getHeader('Delivered-To'),
            originalTo: getHeader('To'),
          };
        } catch (err) {
          console.error(`Error fetching message ${message.id}:`, err);
          return null;
        }
      })
    );

    // Filter out null results and sort by date (newest first)
    const validEmails = emails
      .filter((email) => email !== null)
      .sort((a, b) => {
        const dateA = new Date(a!.date || 0).getTime();
        const dateB = new Date(b!.date || 0).getTime();
        return dateB - dateA;
      });

    return NextResponse.json({ emails: validEmails, count: validEmails.length });
  } catch (error: any) {
    console.error('Error fetching emails:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to fetch emails',
        details: error.stack 
      },
      { status: 500 }
    );
  }
}

function extractBody(payload: any): string {
  if (payload.body?.data) {
    return Buffer.from(payload.body.data, 'base64').toString('utf-8');
  }

  if (payload.parts) {
    for (const part of payload.parts) {
      if (part.mimeType === 'text/plain' && part.body?.data) {
        return Buffer.from(part.body.data, 'base64').toString('utf-8');
      }
      if (part.mimeType === 'text/html' && part.body?.data) {
        return Buffer.from(part.body.data, 'base64').toString('utf-8');
      }
      if (part.parts) {
        const body = extractBody(part);
        if (body) return body;
      }
    }
  }

  return '';
}


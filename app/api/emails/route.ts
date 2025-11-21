import { NextResponse } from 'next/server';
import { google } from 'googleapis';

interface GmailMessage {
  id: string;
  threadId: string;
  labelIds?: string[];
  snippet?: string;
  payload?: any;
  internalDate?: string;
}

// Helper function to extract body from Gmail message
function extractBody(payload: any): string {
  let body = '';

  if (payload.body && payload.body.data) {
    body = Buffer.from(payload.body.data, 'base64').toString('utf-8');
  } else if (payload.parts) {
    for (const part of payload.parts) {
      if (part.mimeType === 'text/html' && part.body?.data) {
        body = Buffer.from(part.body.data, 'base64').toString('utf-8');
        break;
      } else if (part.mimeType === 'text/plain' && part.body?.data && !body) {
        body = Buffer.from(part.body.data, 'base64').toString('utf-8');
      } else if (part.parts) {
        // Recursive search for nested parts
        for (const nestedPart of part.parts) {
          if (nestedPart.mimeType === 'text/html' && nestedPart.body?.data) {
            body = Buffer.from(nestedPart.body.data, 'base64').toString('utf-8');
            break;
          } else if (nestedPart.mimeType === 'text/plain' && nestedPart.body?.data && !body) {
            body = Buffer.from(nestedPart.body.data, 'base64').toString('utf-8');
          }
        }
      }
    }
  }

  return body;
}

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

    // Set up Gmail OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      process.env.GMAIL_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Search for emails sent to this specific address
    const searchQueries = [
      `to:${emailAddress}`,
      `deliveredto:${emailAddress}`,
      `in:anywhere ${emailAddress}`
    ];

    let allMessages: GmailMessage[] = [];

    // Try each search query
    for (const query of searchQueries) {
      try {
        const response = await gmail.users.messages.list({
          userId: 'me',
          q: query,
          maxResults: 50,
        });

        if (response.data.messages) {
          allMessages = allMessages.concat(response.data.messages as GmailMessage[]);
        }
      } catch (err) {
        console.log(`Query "${query}" failed:`, err);
        continue;
      }
    }

    // Remove duplicates based on message ID
    const uniqueMessages = Array.from(
      new Map(allMessages.map(msg => [msg.id, msg])).values()
    );

    // Fetch full details for each message
    const emails = await Promise.all(
      uniqueMessages.map(async (message) => {
        try {
          const fullMessage = await gmail.users.messages.get({
            userId: 'me',
            id: message.id,
            format: 'full',
          });

          const headers = fullMessage.data.payload?.headers || [];
          const subject = headers.find((h: any) => h.name === 'Subject')?.value || '(No Subject)';
          const from = headers.find((h: any) => h.name === 'From')?.value || 'Unknown';
          const date = headers.find((h: any) => h.name === 'Date')?.value || fullMessage.data.internalDate;
          const deliveredTo = headers.find((h: any) => h.name === 'Delivered-To')?.value || emailAddress;
          const originalTo = headers.find((h: any) => h.name === 'X-Original-To')?.value || 
                            headers.find((h: any) => h.name === 'To')?.value || emailAddress;

          const body = extractBody(fullMessage.data.payload);
          const snippet = fullMessage.data.snippet || body.replace(/<[^>]*>/g, '').substring(0, 150);

          // Check if it's spam
          const isSpam = fullMessage.data.labelIds?.includes('SPAM') || false;

          return {
            id: message.id,
            subject,
            from,
            date: date || new Date(parseInt(fullMessage.data.internalDate || '0')).toISOString(),
            snippet,
            body,
            hasFullContent: !!body,
            isSpam,
            deliveredTo,
            originalTo,
            senderEmail: from.match(/<(.+?)>$/)?.[1] || from,
            senderName: from.replace(/<.+?>$/, '').trim() || null,
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
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });

    return NextResponse.json({ 
      emails: validEmails, 
      count: validEmails.length 
    });

  } catch (error: any) {
    console.error('Error fetching emails from Gmail:', error);
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to fetch emails from Gmail',
        emails: [],
        count: 0
      },
      { status: 500 }
    );
  }
}

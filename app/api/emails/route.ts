import { NextResponse } from 'next/server';
import axios from 'axios';

interface ImprovMXLog {
  id: string;
  created: string;
  subject: string;
  sender: {
    email: string;
    name?: string;
  };
  recipient: {
    email: string;
    name?: string;
  };
  forward?: {
    email: string;
    name?: string;
  } | null;
  events: Array<{
    status: string;
    message: string;
    code: number;
  }>;
  messageId?: string;
  hostname?: string;
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

    const apiKey = process.env.IMPROVMX_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'IMPROVMX_API_KEY not configured' },
        { status: 500 }
      );
    }

    // Extract alias and domain from email address
    const [alias, domain] = emailAddress.split('@');
    
    if (!alias || !domain) {
      return NextResponse.json(
        { error: 'Invalid email address format' },
        { status: 400 }
      );
    }

    const authHeader = {
      'Authorization': `Basic ${Buffer.from(`api:${apiKey}`).toString('base64')}`,
    };

    // Fetch logs for this specific alias from ImprovMX
    try {
      const logsResponse = await axios.get(
        `https://api.improvmx.com/v3/domains/${domain}/logs/${alias}`,
        { headers: authHeader }
      );

      if (!logsResponse.data.success || !logsResponse.data.logs) {
        return NextResponse.json({
          emails: [],
          count: 0
        });
      }

      const logs: ImprovMXLog[] = logsResponse.data.logs;

      // Transform ImprovMX logs into email format
      const emails = await Promise.all(
        logs.map(async (log) => {
          let body = '';
          let snippet = '';

          // Try to fetch the email content if available
          // Note: ImprovMX only stores emails briefly or if logging is set to "Highest log data"
          try {
            const emailContentResponse = await axios.get(
              `https://api.improvmx.com/v3/emails/${log.id}.json`,
              { headers: authHeader }
            );
            
            if (emailContentResponse.data) {
              body = emailContentResponse.data.body || emailContentResponse.data.html || emailContentResponse.data.text || '';
              snippet = body.replace(/<[^>]*>/g, '').substring(0, 150);
            }
          } catch (contentError) {
            // Email content not available (common for delivered emails after a few seconds)
            console.log(`Email content not available for ${log.id}`);
            snippet = 'Email content not stored. Enable "Highest log data" in ImprovMX dashboard to store email content.';
          }

          // Check if email was successfully delivered
          const wasDelivered = log.events.some(event => 
            event.status === 'DELIVERED' || event.status === 'QUEUED'
          );
          
          const wasRefused = log.events.some(event => 
            event.status === 'REFUSED' || event.status === 'REJECTED'
          );

          return {
            id: log.id,
            subject: log.subject || '(No Subject)',
            from: log.sender.name 
              ? `${log.sender.name} <${log.sender.email}>`
              : log.sender.email,
            date: log.created,
            snippet: snippet || `Email from ${log.sender.email}`,
            body: body || `<p>Email content not available. Please enable "Highest log data" logging in your ImprovMX dashboard to store email content.</p><p><strong>From:</strong> ${log.sender.email}</p><p><strong>Subject:</strong> ${log.subject}</p>`,
            isSpam: wasRefused,
            deliveredTo: log.recipient.email,
            originalTo: log.recipient.email,
            status: wasRefused ? 'refused' : wasDelivered ? 'delivered' : 'unknown',
          };
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

    } catch (logsError: any) {
      console.error('Error fetching logs from ImprovMX:', logsError);
      
      if (logsError.response?.status === 404) {
        // No logs found for this alias
        return NextResponse.json({
          emails: [],
          count: 0
        });
      }

      throw logsError;
    }

  } catch (error: any) {
    console.error('Error fetching emails:', error);
    
    return NextResponse.json(
      { 
        error: error.response?.data?.error || error.message || 'Failed to fetch emails',
        emails: [],
        count: 0
      },
      { status: error.response?.status || 500 }
    );
  }
}

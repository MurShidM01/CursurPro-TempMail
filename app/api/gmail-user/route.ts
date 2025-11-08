import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET() {
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

    return NextResponse.json({ email: profile.data.emailAddress });
  } catch (error: any) {
    console.error('Error fetching Gmail user:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch Gmail user' },
      { status: 500 }
    );
  }
}


# CursurPro TempMail

A professional and modern temporary email service built with Next.js, featuring real-time email receiving, ImprovMX integration, and Gmail OAuth support.

## Features

- **Instant Email Generation** - Create temporary email addresses instantly
- **Real-time Inbox** - Receive and view emails in real-time with auto-refresh
- **Modern UI** - Beautiful, responsive design with professional styling
- **Privacy Focused** - No registration required, temporary emails only
- **Auto-Expiration** - Emails automatically expire after 24 hours with warnings
- **Fast & Reliable** - Built with Next.js 16 and TypeScript

## Prerequisites

- Node.js 18+ and npm
- ImprovMX API key
- Google OAuth credentials (Gmail API)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
IMPROVMX_API_KEY=YOUR_IMPROVEMX_API_KEY
GMAIL_CLIENT_ID=YOUR_GAMAIL_CLIENT_ID
GMAIL_CLIENT_SECRET=YOUR_GMAIL_CLIENT_SECRET
GMAIL_REDIRECT_URI=YOUR_GMAIL_REDIRECT_URI
GMAIL_REFRESH_TOKEN=YOUR_GMAIL_REFRESH_TOKE
GMAIL_AUTH_URL=YOUR_GMAIL_AUTH_URL
```

### 3. Google OAuth Credentials

Download credentials.json` file in the root directory:

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── api/
│   ├── domains/        # ImprovMX domains API
│   ├── alias/          # Create email aliases
│   ├── emails/         # Fetch emails from Gmail
│   └── oauth2callback/ # OAuth callback handler
├── components/
│   └── EmailInbox.tsx  # Email inbox component
├── layout.tsx          # Root layout
├── page.tsx            # Main page
└── globals.css         # Global styles
```

## API Routes

### GET `/api/domains`
Fetches available ImprovMX domains.

### POST `/api/alias`
Creates a new email alias.
```json
{
  "domain": "example.com",
  "alias": "myalias"
}
```

### GET `/api/emails?email=alias@domain.com`
Fetches emails for a specific address.

### GET `/api/oauth2callback`
Handles Google OAuth callback.

## Technologies Used

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **React Inline Styles** - Modern styling approach
- **ImprovMX API** - Email forwarding service
- **Gmail API** - Email retrieval
- **Lucide React** - Professional icons

## License

Private project - All rights reserved.

<div align="center">

# 📧 CursurPro TempMail

### 🚀 Modern Temporary Email Service - Privacy First, Style Always

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![License](https://img.shields.io/badge/License-Private-red?style=for-the-badge)](LICENSE)

**Create temporary email addresses instantly. Receive emails in real-time. Protect your privacy.**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [API](#-api-documentation) • [Tech Stack](#-tech-stack)

---

</div>

## ✨ Features

### 🎯 Core Functionality
- ⚡ **Instant Email Generation** - Create temporary email addresses in milliseconds
- 📬 **Real-time Inbox** - Auto-refresh every 5 seconds with live email updates
- 🔒 **100% Privacy** - No registration, no tracking, complete anonymity
- ⏰ **Auto-Expiration** - Emails expire after 24 hours with visual countdown timers
- 🗑️ **Auto-Cleanup** - Individual emails auto-delete after 15 minutes

### 🎨 Modern UI/UX
- 🌈 **Beautiful Design** - Modern teal/emerald/cyan gradient theme
- 📱 **Fully Responsive** - Perfect on desktop, tablet, and mobile
- 🎭 **Smooth Animations** - Elegant transitions and hover effects
- 🎯 **Intuitive Interface** - Clean, user-friendly design
- 💎 **Glassmorphism** - Modern frosted glass effects

### 🔧 Advanced Features
- 📋 **One-Click Copy** - Copy email address with beautiful glass button
- 🔍 **OTP Detection** - Automatically extracts verification codes
- 🔗 **Link Extraction** - Finds and displays all links in emails
- 📊 **Live Statistics** - Real-time platform stats display
- 🎨 **Dynamic Progress Bars** - Color-coded countdown timers

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **ImprovMX API Key** - Get from [ImprovMX](https://improvmx.com)
- **Google OAuth Credentials** - For Gmail API access

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MurShidM01/CursurPro-TempMail
   cd CursurPro-TempMai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   IMPROVMX_API_KEY=your_improvmx_api_key_here
   GMAIL_CLIENT_ID=your_gmail_client_id_here
   GMAIL_CLIENT_SECRET=your_gmail_client_secret_here
   GMAIL_REDIRECT_URI=http://localhost:3000/oauth2callback
   GMAIL_REFRESH_TOKEN=your_gmail_refresh_token_here
   GMAIL_AUTH_URL=http://localhost:3000
   ```

4. **Set up Google OAuth**
   
   Download your `credentials.json` file from Google Cloud Console and place it in the root directory.

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📖 Usage

### Creating a Temporary Email

1. Visit the homepage
2. Click **"Get Started Free"**
3. Your temporary email is generated instantly
4. Copy the email address using the **Copy** button
5. Use it for sign-ups, verifications, or any temporary purpose

### Receiving Emails

- Emails appear automatically in the inbox
- Auto-refresh every 5 seconds
- Click any email to view full content
- OTP codes are automatically detected and highlighted
- All links are extracted and displayed

### Email Expiration

- **Email Address**: Expires after 24 hours
- **Individual Emails**: Auto-delete after 15 minutes
- Visual countdown timers show remaining time
- Color-coded progress bars indicate urgency

---

## 🏗️ Project Structure

```
CursurPro-TempMai
├── app/
│   ├── api/
│   │   ├── domains/          # ImprovMX domains endpoint
│   │   ├── alias/            # Create email aliases
│   │   ├── emails/           # Fetch emails from Gmail
│   │   ├── stats/            # Platform statistics
│   │   └── oauth2callback/   # OAuth callback handler
│   ├── components/
│   │   ├── EmailInbox.tsx    # Email inbox component
│   │   └── HomePage.tsx      # Landing page component
│   ├── layout.tsx            # Root layout with fonts
│   ├── page.tsx              # Main application page
│   ├── theme.ts              # Design system & theme
│   └── globals.css           # Global styles
├── public/                   # Static assets
├── .env.local               # Environment variables (not in git)
├── package.json             # Dependencies
└── README.md                # This file
```

---

## 🔌 API Documentation

### GET `/api/domains`
Fetches all available ImprovMX domains.

**Response:**
```json
{
  "domains": [
    {
      "domain": "example.com",
      "active": true
    }
  ]
}
```

### POST `/api/alias`
Creates a new email alias.

**Request:**
```json
{
  "domain": "example.com",
  "alias": "myalias"
}
```

**Response:**
```json
{
  "success": true,
  "email": "myalias@example.com"
}
```

### GET `/api/emails?email=alias@domain.com`
Fetches all emails for a specific address.

**Response:**
```json
{
  "emails": [
    {
      "id": "email_id",
      "subject": "Email Subject",
      "from": "sender@example.com",
      "date": "2024-01-01T00:00:00Z",
      "snippet": "Email preview...",
      "body": "<html>...</html>"
    }
  ]
}
```

### GET `/api/stats`
Returns platform statistics.

**Response:**
```json
{
  "stats": {
    "emailsGenerated": 10000,
    "emailsReceived": 50000,
    "activeUsers": 500,
    "domainsAvailable": 10,
    "uptime": "99.9%",
    "responseTime": "< 100ms"
  }
}
```

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - Latest React features
- **TypeScript** - Type-safe development
- **Lucide React** - Beautiful icon library

### Styling
- **Custom Theme System** - Professional design tokens
- **Inline Styles** - Modern React styling approach
- **CSS Animations** - Smooth transitions and effects
- **Responsive Design** - Mobile-first approach

### Backend & APIs
- **ImprovMX API** - Email forwarding service
- **Gmail API** - Email retrieval via OAuth
- **Next.js API Routes** - Serverless functions

### Features
- **localStorage** - Client-side email persistence
- **Cookies** - Backup storage mechanism
- **Real-time Updates** - Auto-refresh functionality

---

## 🎨 Design System

The project uses a comprehensive design system defined in `app/theme.ts`:

- **Color Palette**: Teal, Emerald, Cyan gradients
- **Typography**: Poppins font family
- **Spacing**: Consistent 8px grid system
- **Shadows**: Multi-layered depth effects
- **Animations**: Smooth cubic-bezier transitions

---

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `IMPROVMX_API_KEY` | Your ImprovMX API key | ✅ Yes |
| `GMAIL_CLIENT_ID` | Google OAuth Client ID | ✅ Yes |
| `GMAIL_CLIENT_SECRET` | Google OAuth Client Secret | ✅ Yes |
| `GMAIL_REDIRECT_URI` | OAuth redirect URI | ✅ Yes |
| `GMAIL_REFRESH_TOKEN` | OAuth refresh token | ✅ Yes |
| `GMAIL_AUTH_URL` | Base auth URL | ✅ Yes |

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/cursurprotempmail)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is private and proprietary. All rights reserved.

---

## 🙏 Acknowledgments

- **ImprovMX** - Email forwarding service
- **Google** - Gmail API
- **Next.js Team** - Amazing framework
- **Lucide** - Beautiful icons

---

<div align="center">

**Made with ❤️ by CursurPro**

⭐ Star this repo if you find it helpful!

[Report Bug](https://github.com/yourusername/cursurprotempmail/issues) • [Request Feature](https://github.com/yourusername/cursurprotempmail/issues)

</div>

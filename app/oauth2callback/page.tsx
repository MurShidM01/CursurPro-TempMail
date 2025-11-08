import { redirect } from 'next/navigation';

export default function OAuth2Callback() {
  // This page will be handled by the API route
  // Redirect to API route for processing
  redirect('/api/oauth2callback');
}


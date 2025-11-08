import { NextResponse } from 'next/server';
import { deleteOldAliases } from './deleteOldAliases';

// Cleanup old aliases that are older than 24 hours
const ALIAS_MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { domain, maxAge } = body;

    if (!domain) {
      return NextResponse.json(
        { error: 'Domain is required' },
        { status: 400 }
      );
    }

    const result = await deleteOldAliases(domain, maxAge || ALIAS_MAX_AGE);

    return NextResponse.json({
      success: true,
      ...result
    });
  } catch (error: any) {
    console.error('Error cleaning up aliases:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to cleanup aliases',
        success: false
      },
      { status: 500 }
    );
  }
}

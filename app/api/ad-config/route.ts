import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const configPath = path.join(process.cwd(), 'HandleAds.json');
    const configData = fs.readFileSync(configPath, 'utf-8');
    const config = JSON.parse(configData);
    
    return NextResponse.json({
      monetag: config.Monetag === 'enable',
      popads: config.PopAds === 'enable'
    });
  } catch (error) {
    console.error('Error reading ad configuration:', error);
    // Default to all ads disabled if file not found
    return NextResponse.json({
      monetag: false,
      popads: false
    });
  }
}

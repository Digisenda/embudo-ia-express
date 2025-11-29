import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * API Route para obtener los testimonios
 * GET /api/testimonials
 */
export async function GET() {
  try {
    const testimonialsPath = path.join(process.cwd(), 'content', 'testimonials.json');
    const testimonialsFile = fs.readFileSync(testimonialsPath, 'utf-8');
    const testimonialsData = JSON.parse(testimonialsFile);

    return NextResponse.json({
      success: true,
      data: testimonialsData,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Error al cargar testimonios',
      },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { safeGetClientConfig } from '@/lib/config';

/**
 * API Route para obtener la configuración del cliente
 * GET /api/config
 */
export async function GET() {
  const result = safeGetClientConfig();

  if (result.success) {
    return NextResponse.json(result);
  }

  return NextResponse.json(result, { status: 400 });
}

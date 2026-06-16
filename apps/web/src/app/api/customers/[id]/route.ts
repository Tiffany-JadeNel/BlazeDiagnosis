import { getCustomerById } from '@/features/customers/services/customer.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  // Get the tenantId from the URL query string
  const { id } = await params;
  const tenantId = request.nextUrl.searchParams.get('tenantId');

  // Validate that the tenantId is provided
  if (!tenantId) 
  {
    return NextResponse.json(
      { error: 'Missing required tenantId parameter' },
      { status: 400 },
    );
  }

  try {
      const DB= await getCustomerById(tenantId, id)
      return NextResponse.json(DB)
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to fetch Customer details' },
        { status: 500 },
      );
    }
}

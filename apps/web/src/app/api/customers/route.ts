import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { createCustomerSchema } from '@/features/customers/schemas/customer.schema';
import {
  createCustomer,
  searchCustomers,
} from '@/features/customers/services/customer.service';
import { requireTenantContext } from '@/lib/tenancy/tenant-context';

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Internal Server Error';
}

export async function GET(request: Request) {
  try {
    const tenant = await requireTenantContext();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') ?? '';
    const data = await searchCustomers(tenant.tenantId, query);

    return NextResponse.json({ customers: data }, { status: 200 });
  } catch (error) {
    console.error('GET /api/customers failed:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: getErrorMessage(error) },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const tenant = await requireTenantContext();
    const body = await request.json();
    const input = createCustomerSchema.parse(body);
    const customer = await createCustomer(tenant.tenantId, input);

    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    console.error('POST /api/customers failed:', error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', issues: error.issues },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error', message: getErrorMessage(error) },
      { status: 500 },
    );
  }
}

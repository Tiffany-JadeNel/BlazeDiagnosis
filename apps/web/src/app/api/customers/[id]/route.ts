import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { updateCustomerSchema } from '@/features/customers/schemas/customer.schema';
import {
  deleteCustomer,
  getCustomerById,
  updateCustomer,
} from '@/features/customers/services/customer.service';
import { requireTenantContext } from '@/lib/tenancy/tenant-context';

type RouteContext = {
  params: Promise<{ id: string }>;
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Internal Server Error';
}

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const tenant = await requireTenantContext();
    const customer = await getCustomerById(tenant.tenantId, id);

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    return NextResponse.json(customer, { status: 200 });
  } catch (error) {
    console.error('GET /api/customers/[id] failed:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: getErrorMessage(error) },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const tenant = await requireTenantContext();
    const body = await request.json();
    const input = updateCustomerSchema.parse(body);
    const customer = await updateCustomer(tenant.tenantId, id, input);

    return NextResponse.json(customer, { status: 200 });
  } catch (error) {
    console.error('PATCH /api/customers/[id] failed:', error);

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

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const tenant = await requireTenantContext();
    await deleteCustomer(tenant.tenantId, id);

    return NextResponse.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/customers/[id] failed:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: getErrorMessage(error) },
      { status: 500 },
    );
  }
}

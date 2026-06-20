import { and, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { db } from '@/db/client';
import { vehicles } from '@/db/schema/vehicles';
import { createVehicleSchema } from '@/features/vehicles/schemas/vehicle.schema';
import { createVehicle } from '@/features/vehicles/services/vehicle.service';
import { requireTenantContext } from '@/lib/tenancy/tenant-context';

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Internal Server Error';
}

export async function GET() {
  try {
    const tenant = await requireTenantContext();
    const data = await db
      .select()
      .from(vehicles)
      .where(
        and(
          eq(vehicles.tenantId, tenant.tenantId),
          eq(vehicles.isArchived, false),
        ),
      );

    return NextResponse.json({ vehicles: data }, { status: 200 });
  } catch (error) {
    console.error('GET /api/vehicle failed:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: getErrorMessage(error) },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const tenant = await requireTenantContext();
    const input = createVehicleSchema.parse(await request.json());
    const vehicle = await createVehicle(tenant.tenantId, input);

    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    console.error('POST /api/vehicle failed:', error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.flatten().fieldErrors },
        { status: 422 },
      );
    }

    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: error instanceof Error ? 409 : 500 },
    );
  }
}

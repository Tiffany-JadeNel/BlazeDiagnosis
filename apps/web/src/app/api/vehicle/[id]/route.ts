import { NextResponse } from 'next/server';

import {
  deleteVehicle,
  listVehiclesForCustomer,
} from '@/features/vehicles/services/vehicle.service';
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
    const vehicles = await listVehiclesForCustomer(tenant.tenantId, id);

    return NextResponse.json({ vehicles }, { status: 200 });
  } catch (error) {
    console.error('GET /api/vehicle/[id] failed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vehicles', message: getErrorMessage(error) },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const tenant = await requireTenantContext();
    await deleteVehicle(tenant.tenantId, id);

    return NextResponse.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/vehicle/[id] failed:', error);
    return NextResponse.json(
      { error: 'Failed to delete vehicle', message: getErrorMessage(error) },
      { status: 500 },
    );
  }
}

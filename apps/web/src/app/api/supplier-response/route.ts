import { and, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { z, ZodError } from 'zod';

import { db } from '@/db/client';
import {
  supplierResponseItems,
  supplierResponses,
} from '@/db/schema/suppliers';
import { requireTenantContext } from '@/lib/tenancy/tenant-context';

const createSupplierResponseSchema = z.object({
  deliveryFee: z.union([z.string(), z.number()]).optional(),
  eta: z.string().datetime().optional(),
  items: z
    .array(
      z.object({
        availability: z.string().default('available'),
        brand: z.string().optional(),
        partId: z.string().uuid(),
        partName: z.string().min(1),
        partNumber: z.string().optional(),
        quantityAvailable: z.union([z.string(), z.number()]).default(1),
        unitPrice: z.union([z.string(), z.number()]).default(0),
      }),
    )
    .min(1),
  partsRequestId: z.string().uuid(),
  subtotal: z.union([z.string(), z.number()]).default(0),
  supplierId: z.string().uuid(),
  tax: z.union([z.string(), z.number()]).default(0),
  total: z.union([z.string(), z.number()]).default(0),
});

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Internal Server Error';
}

export async function GET(request: Request) {
  try {
    const tenant = await requireTenantContext();
    const { searchParams } = new URL(request.url);
    const partsRequestId = searchParams.get('partsRequestId');

    if (!partsRequestId) {
      return NextResponse.json(
        { error: "Missing required 'partsRequestId' parameter" },
        { status: 400 },
      );
    }

    const responses = await db
      .select()
      .from(supplierResponses)
      .where(
        and(
          eq(supplierResponses.tenantId, tenant.tenantId),
          eq(supplierResponses.partsRequestId, partsRequestId),
        ),
      );

    return NextResponse.json({ responses });
  } catch (error) {
    console.error('GET /api/supplier-response failed:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: getErrorMessage(error) },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const tenant = await requireTenantContext();
    const input = createSupplierResponseSchema.parse(await request.json());

    const [response] = await db
      .insert(supplierResponses)
      .values({
        deliveryFee: String(input.deliveryFee ?? 0),
        eta: input.eta ? new Date(input.eta) : undefined,
        partsRequestId: input.partsRequestId,
        status: 'submitted',
        subtotal: String(input.subtotal),
        supplierId: input.supplierId,
        taxTotal: String(input.tax),
        tenantId: tenant.tenantId,
        total: String(input.total),
      })
      .returning();

    const itemValues: (typeof supplierResponseItems.$inferInsert)[] =
      input.items.map((item) => ({
        availabilityStatus: item.availability,
        brand: item.brand,
        partName: item.partName,
        partNumber: item.partNumber,
        partsRequestItemId: item.partId,
        quantityAvailable: String(item.quantityAvailable),
        supplierResponseId: response.id,
        tenantId: tenant.tenantId,
        unitPrice: String(item.unitPrice),
      }));

    await db.insert(supplierResponseItems).values(itemValues);

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('POST /api/supplier-response failed:', error);

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

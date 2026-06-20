import { and, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { z, ZodError } from 'zod';

import { db } from '@/db/client';
import { partsRequestItems, partsRequests } from '@/db/schema/suppliers';
import { requireTenantContext } from '@/lib/tenancy/tenant-context';

const createPartsRequestSchema = z.object({
  items: z
    .array(
      z.object({
        notes: z.string().optional(),
        partId: z.union([z.string(), z.number()]),
        quantity: z.number().int().positive().default(1),
      }),
    )
    .min(1),
  jobCardId: z.string().uuid(),
  notes: z.string().optional(),
  staffId: z.string().uuid().optional(),
});

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Internal Server Error';
}

export async function GET(request: Request) {
  try {
    const tenant = await requireTenantContext();
    const { searchParams } = new URL(request.url);
    const jobCardId = searchParams.get('jobCardId');

    if (!jobCardId) {
      return NextResponse.json(
        { error: "Missing required 'jobCardId'" },
        { status: 400 },
      );
    }

    const requests = await db
      .select()
      .from(partsRequests)
      .where(
        and(
          eq(partsRequests.tenantId, tenant.tenantId),
          eq(partsRequests.jobCardId, jobCardId),
        ),
      );

    return NextResponse.json({ requests });
  } catch (error) {
    console.error('GET /api/parts-request failed:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: getErrorMessage(error) },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const tenant = await requireTenantContext();
    const input = createPartsRequestSchema.parse(await request.json());

    const [partsRequest] = await db
      .insert(partsRequests)
      .values({
        jobCardId: input.jobCardId,
        notes: input.notes,
        requestedByUserId: input.staffId,
        status: 'draft',
        tenantId: tenant.tenantId,
      })
      .returning();

    const itemValues: (typeof partsRequestItems.$inferInsert)[] = input.items.map(
      (item) => ({
        notes: item.notes,
        partName: String(item.partId),
        partNumber: String(item.partId),
        partsRequestId: partsRequest.id,
        quantity: String(item.quantity),
        tenantId: tenant.tenantId,
      }),
    );

    await db.insert(partsRequestItems).values(itemValues);

    return NextResponse.json(
      { requestId: partsRequest.id, success: true },
      { status: 201 },
    );
  } catch (error) {
    console.error('POST /api/parts-request failed:', error);

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

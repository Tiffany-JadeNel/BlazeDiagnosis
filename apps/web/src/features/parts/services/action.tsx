'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/db/client';
import { parts } from '@/db/schema/parts';
import { eq } from 'drizzle-orm';
import { requireTenantContext } from '@/lib/tenancy/tenantContext';
import { createPartsCatalogSchema, CreatePartsCatalogInput } from '../schemas/partsCatalogSchema';

export async function getPartsCatalogAction() {
  try {
    const tenant = await requireTenantContext();
    return await db
      .select()
      .from(parts)
      .where(eq(parts.tenantId, tenant.tenantId));
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch catalog records.');
  }
}

export async function addPartToCatalogAction(payload: CreatePartsCatalogInput) {
  try {
    const tenant = await requireTenantContext();
    const input = createPartsCatalogSchema.parse(payload);

    const [item] = await db
      .insert(parts)
      .values({
        name: input.name,
        partNumber: input.partNumber,
        sku: input.sku,
        brand: input.brand,
        category: input.category,
        description: input.description,
        costPrice: input.costPrice,
        retailPrice: input.retailPrice,
        quantityOnHand: input.quantityOnHand,
        tenantId: tenant.tenantId,
      })
      .returning();

    revalidatePath('/parts');
    return { success: true, data: item };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to append to stock logs.' };
  }
}

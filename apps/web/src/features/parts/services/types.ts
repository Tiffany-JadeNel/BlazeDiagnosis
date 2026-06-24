import { eq } from 'drizzle-orm';

import { db } from '@/db/client';
import { parts } from '@/db/schema/parts';
import { requireTenantContext } from '@/lib/tenancy/tenantContext';

export interface ICreatePartPayload {
  name: string;
  partNumber: string;
  sku?: string;
  brand?: string;
  category?: string;
  description?: string;
  costPrice?: string;
  retailPrice?: string;
  quantityOnHand?: string;
}

export async function getTenantCatalogParts() {
  const tenant = await requireTenantContext();

  return await db
    .select()
    .from(parts)
    .where(eq(parts.tenantId, tenant.tenantId));
}

export async function createCatalogPartEntry(data: ICreatePartPayload) {
  const tenant = await requireTenantContext();

  const newPart = await db
    .insert(parts)
    .values({
      name: data.name,
      partNumber: data.partNumber,
      sku: data.sku,
      brand: data.brand,
      category: data.category,
      description: data.description,
      costPrice: data.costPrice,
      retailPrice: data.retailPrice,
      quantityOnHand: data.quantityOnHand,
      tenantId: tenant.tenantId,
    })
    .returning();

  return newPart[0];
}

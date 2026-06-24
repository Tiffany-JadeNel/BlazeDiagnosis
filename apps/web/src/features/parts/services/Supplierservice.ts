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

async function getSession() {
  return requireTenantContext();
}

export async function getTenantCatalogParts() {
  const { tenantId } = await getSession();
  
  return db
    .select()
    .from(parts)
    .where(eq(parts.tenantId, tenantId));
}

export async function createCatalogPartEntry(data: ICreatePartPayload) {
  const { tenantId } = await getSession();

  const newPart = await db
    .insert(parts)
    .values({
      ...data,
      tenantId,
    })
    .returning();

  return newPart[0];
}

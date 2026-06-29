import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { parts, partsRequests, partsRequestItems } from '@/db/schema/parts';


export type DBPart = InferSelectModel<typeof parts>;
export type NewDBPart = InferInsertModel<typeof parts>;

export type DBPartsRequest = InferSelectModel<typeof partsRequests>;
export type DBPartsRequestItem = InferSelectModel<typeof partsRequestItems>;


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

export interface ICreatePartsRequestPayload {
  jobCardId: string;
  staffId?: string;
  notes?: string;
  items: {
    partId: string;
    quantity: string;
    notes?: string;
  }[];
}

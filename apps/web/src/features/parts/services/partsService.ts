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

const fetchWithErrorHandling = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
};

export const getTenantCatalogParts = async (): Promise<ICreatePartPayload[]> => {
  try {
    const data = await fetchWithErrorHandling('/api/parts');
    return data.catalog || [];
  } catch (error: any) {
    throw new Error(error.message || 'Failed to sync with catalog endpoint');
  }
};

export const createCatalogPartEntry = async (data: ICreatePartPayload): Promise<ICreatePartPayload> => {
  try {
    const options: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    return await fetchWithErrorHandling('/api/parts', options);
  } catch (error: any) {
    throw new Error(error.message || 'Failed to persist part mutation');
  }
};


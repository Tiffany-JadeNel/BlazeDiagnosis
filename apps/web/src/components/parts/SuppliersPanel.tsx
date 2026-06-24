'use client';

import React, { useState, useEffect } from 'react';

interface IPart {
  id: string;
  name: string;
  partNumber: string;
  sku?: string;
  brand?: string;
  category?: string;
  description?: string;
  quantityOnHand: string;
  retailPrice: string;
}

export const PartsCatalogPanel: React.FC = () => {
  const [catalog, setCatalog] = useState<IPart[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  const [form, setForm] = useState({
    name: '',
    partNumber: '',
    sku: '',
    brand: '',
    category: '',
    description: '',
    costPrice: '0.00',
    retailPrice: '0.00',
    quantityOnHand: '0.00',
  });

  useEffect(() => {
    refreshCatalog();
  }, []);


  const refreshCatalog = async () => {
    try {
      setLoading(true);
      setErrorText(null);
      
      const res = await fetch('/api/parts');
      if (!res.ok) throw new Error('Failed to retrieve parts catalog from backend service.');
      
      const data = await res.json();
      setCatalog(data);
    } catch (err: any) {
      setErrorText(err.message || 'Error syncing with backend.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Secure asynchronous form submission dispatcher
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setErrorText(null);

    try {
      const res = await fetch('/api/parts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Express server rejected part registration.');

      setForm({
        name: '',
        partNumber: '',
        sku: '',
        brand: '',
        category: '',
        description: '',
        costPrice: '0.00',
        retailPrice: '0.00',
        quantityOnHand: '0.00',
      });
      await refreshCatalog();
    } catch (err: any) {
      setErrorText(err.message || 'Failed to sync with API.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '14px' }}>Parts Master Inventory</h2>
      
      {errorText && (
        <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '4px', marginBottom: '14px' }}>
          {errorText}
        </div>
      )}

      {/* Dynamic Entry Form Block Layout */}
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '12px', background: '#f9fafb', padding: '16px', borderRadius: '6px', marginBottom: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '500' }}>Part Name *</label>
            <input type="text" name="name" required value={form.name} onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '500' }}>Part Number *</label>
            <input type="text" name="partNumber" required value={form.partNumber} onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '500' }}>SKU Code</label>
            <input type="text" name="sku" value={form.sku} onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '500' }}>Brand</label>
            <input type="text" name="brand" value={form.brand} onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '500' }}>Category</label>
            <input type="text" name="category" value={form.category} onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '500' }}>Cost Price</label>
            <input type="number" step="0.01" name="costPrice" value={form.costPrice} onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '500' }}>Retail Price</label>
            <input type="number" step="0.01" name="retailPrice" value={form.retailPrice} onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '500' }}>Initial Qty</label>
            <input type="number" step="0.01" name="quantityOnHand" value={form.quantityOnHand} onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '500' }}>Description Log Notes</label>
          <textarea name="description" value={form.description} onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical' }} rows={2} />
        </div>

        <button type="submit" disabled={isPending} style={{ padding: '10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: isPending ? 'not-allowed' : 'pointer', fontWeight: 'bold', marginTop: '6px' }}>
          {isPending ? 'Processing...' : 'Register Catalog Item'}
        </button>
      </form>

      
      <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Active System Stock Profiles</h3>
      {loading ? (
        <p style={{ color: '#4b5563' }}>Parsing database registry...</p>
      ) : catalog.length === 0 ? (
        <p style={{ color: '#6b7280', fontStyle: 'italic' }}>No parts registered yet.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f3f4f6', borderBottom: '1px solid #ddd' }}>
                <th style={{ padding: '10px', textAlign: 'left', fontSize: '13px' }}>Item Name</th>
                <th style={{ padding: '10px', textAlign: 'left', fontSize: '13px' }}>Part Number</th>
                <th style={{ padding: '10px', textAlign: 'left', fontSize: '13px' }}>Brand</th>
                <th style={{ padding: '10px', textAlign: 'left', fontSize: '13px' }}>Stock Qty</th>
                <th style={{ padding: '10px', textAlign: 'left', fontSize: '13px' }}>Retail Price</th>
              </tr>
            </thead>
            <tbody>
              {catalog.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px', fontSize: '13px' }}>{item.name}</td>
                  <td style={{ padding: '10px', fontSize: '13px' }}>{item.partNumber}</td>
                  <td style={{ padding: '10px', fontSize: '13px' }}>{item.brand || '-'}</td>
                  <td style={{ padding: '10px', fontSize: '13px', fontWeight: 'bold' }}>{item.quantityOnHand}</td>
                  <td style={{ padding: '10px', fontSize: '13px', color: '#16a34a', fontWeight: '500' }}>${item.retailPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

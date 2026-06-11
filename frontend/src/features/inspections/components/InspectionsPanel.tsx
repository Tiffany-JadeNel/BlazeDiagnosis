'use client'

import React, { useState } from 'react';
import { InspectionsRecord, DEFAULT_INSPECTION_STATUS, InspectionIssue, DEFAULT_ISSUE_SECTIONS, } from '../types/inspections.types';

export function InspectionsPanel() {
  const [items, setItems] = useState<InspectionsRecord[]>([]);
  const [model, setModel] = useState('');
  const [vin, setVin] = useState('');
  const [inspector, setInspector] = useState('');
  const [notes, setNotes] = useState('');
  const [issues, setIssues] = useState<InspectionIssue[]>([]);

  async function handleAdd(e?: React.FormEvent) {
    e?.preventDefault();
    if (!model.trim()) return;

    // payload construction
    const payload: InspectionsRecord = {
      id: crypto.randomUUID(),
      model: model.trim(),
      vin: vin.trim() || undefined,
      inspector: inspector.trim() || undefined,
      notes: notes.trim() || undefined,
      issues: issues.length ? issues : undefined,
      date: new Date().toISOString(),
      status: DEFAULT_INSPECTION_STATUS,
    };
    // add item to list
    setItems(prev => [payload, ...prev]);
    setModel(''); setVin(''); setInspector(''); setNotes('');
    setIssues([]);
  }

  // delete fromm items list if exits
  function handleDelete(id: string) {
    setItems(prev => prev.filter(i => i.id !== id));
  }

  function toggleComplete(id: string) {
    const item = items.find(i => i.id === id);
    if (!item) return;
    const newStatus = item.status === 'completed' ? 'pending' : 'completed';
    setItems(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-3">Inspections</h2>

      <form onSubmit={handleAdd} className="mb-4 space-y-2">
        <div>
          <label className="block text-sm">Model</label>
          <input value={model} onChange={e => setModel(e.target.value)} className="border px-2 py-1 w-full" placeholder="Vehicle model" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input value={vin} onChange={e => setVin(e.target.value)} className="border px-2 py-1" placeholder="VIN (optional)" />
          <input value={inspector} onChange={e => setInspector(e.target.value)} className="border px-2 py-1" placeholder="Inspector" />
        </div>
        <div>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} className="border px-2 py-1 w-full" placeholder="Notes (optional)" />
        </div>
        <div className="border rounded p-2">
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium">Issues</div>
            <button type="button" onClick={() => setIssues(prev => [...prev,
            {
              section: DEFAULT_ISSUE_SECTIONS[0],
              fault: '',
              severity: 'medium'
            }
            ])} className="text-sm px-2 py-1 border rounded">Add Issue</button>
          </div>
          <div className="space-y-2">
            {issues.length === 0 && <div className="text-sm text-gray-500">No issues added.</div>}
            {issues.map((iss, idx) => (
              <div key={idx} className="grid grid-cols-3 gap-2 items-center">
                <select value={iss.section} onChange={e => setIssues(prev => {
                  const copy = [...prev];
                  copy[idx] = { ...copy[idx], section: e.target.value };
                  return copy;
                })} className="border px-2 py-1">

                  {DEFAULT_ISSUE_SECTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <input value={iss.fault} onChange={e => setIssues(prev => { const copy = [...prev]; copy[idx] = { ...copy[idx], fault: e.target.value }; return copy; })} placeholder="Fault description" className="border px-2 py-1" />
                <div className="flex gap-2">
                  <select value={iss.severity} onChange={e => setIssues(prev => { const copy = [...prev]; copy[idx] = { ...copy[idx], severity: e.target.value as any }; return copy; })} className="border px-2 py-1">
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                  </select>
                  <button type="button" onClick={() => setIssues(prev => prev.filter((_, i) => i !== idx))} className="px-2 py-1 border rounded text-red-600">Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Add Inspection</button>
        </div>
      </form>

      <div className="space-y-2">
        {items.length === 0 && <div className="text-sm text-gray-500">No inspections yet.</div>}
        {items.map(item => (
          <div key={item.id} className="border rounded p-2 flex justify-between items-start">
            <div>
              <div className="font-medium">{item.model} {item.vin ? `(${item.vin})` : ''}</div>
              <div className="text-sm text-gray-600">{item.inspector ? `Inspector: ${item.inspector}` : 'Unassigned'}</div>
              {item.notes && <div className="mt-1 text-sm">{item.notes}</div>}
              {item.issues && item.issues.length > 0 && (
                <div className="mt-2">
                  <div className="text-sm font-medium">Issues</div>
                  <ul className="text-sm list-disc ml-5">
                    {item.issues.map((iss, i) => (
                      <li key={i}>
                        {iss.section}: {iss.fault} {iss.severity ? `(${iss.severity})` : ''}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="text-xs text-gray-500 mt-1">{item.date ? new Date(item.date).toLocaleString() : ''} • {item.status}</div>
            </div>
            <div className="flex flex-col gap-2 ml-4">
              <button onClick={() => toggleComplete(item.id)} className="px-2 py-1 border rounded">{item.status === 'completed' ? 'Mark Pending' : 'Mark Done'}</button>
              <button onClick={() => handleDelete(item.id)} className="px-2 py-1 border rounded text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

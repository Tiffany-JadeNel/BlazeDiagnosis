'use client';

import { useEffect, useState } from 'react';

import { StatusBadge } from '@/components/common/status-badge';
import { EmptyState } from '@/components/data-display';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type VehicleDetailRecord = {
  archived?: boolean;
  createdAt?: string;
  customerName?: string;
  id: string;
  inspections?: { date: string; id: string }[];
  jobs?: { id: string; status: string }[];
  make?: string;
  model?: string;
  quotes?: { amount: number; id: string }[];
  registrationNumber?: string;
  updatedAt?: string;
};

type VehicleDetailProps = {
  vehicleId: string;
};

export function VehicleDetail({ vehicleId }: VehicleDetailProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [vehicle, setVehicle] = useState<VehicleDetailRecord | null>(null);

  useEffect(() => {
    const loadVehicle = async () => {
      try {
        setError(null);
        setLoading(true);

        const response = await fetch(`/api/vehicle/${vehicleId}`);

        if (!response.ok) {
          throw new Error(`Unable to load vehicle: ${response.statusText}`);
        }

        setVehicle(await response.json());
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load vehicle.');
      } finally {
        setLoading(false);
      }
    };

    if (vehicleId) {
      void loadVehicle();
    }
  }, [vehicleId]);

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6 text-sm text-muted-foreground">
          Loading vehicle details...
        </CardContent>
      </Card>
    );
  }

  if (error || !vehicle) {
    return (
      <EmptyState
        description={error ?? 'The selected vehicle could not be found.'}
        title="Vehicle unavailable"
      />
    );
  }

  return (
    <Card>
      <CardHeader className="gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle>
            {vehicle.make ?? 'Vehicle'} {vehicle.model ?? ''}
          </CardTitle>
          <CardDescription>
            {vehicle.registrationNumber ?? 'No registration'} • Owner: {vehicle.customerName ?? 'Unassigned'}
          </CardDescription>
        </div>
        {vehicle.archived ? <StatusBadge tone="warning">Archived</StatusBadge> : <StatusBadge tone="success">Active</StatusBadge>}
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DetailItem label="Created" value={vehicle.createdAt ? new Date(vehicle.createdAt).toLocaleString() : '—'} />
        <DetailItem label="Updated" value={vehicle.updatedAt ? new Date(vehicle.updatedAt).toLocaleString() : '—'} />
        <DetailItem label="Open jobs" value={String(vehicle.jobs?.length ?? 0)} />
        <DetailItem label="Quotes" value={String(vehicle.quotes?.length ?? 0)} />
      </CardContent>
    </Card>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/40 p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

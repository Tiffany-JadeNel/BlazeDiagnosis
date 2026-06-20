'use client';

import { useEffect, useMemo, useState } from 'react';

import {
  EmptyState,
  ResponsiveTable,
  tableCellClassName,
  tableHeadClassName,
} from '@/components/data-display';
import { StatusBadge } from '@/components/common/status-badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type Customer = {
  email?: string;
  firstName?: string;
  id: string;
  lastName?: string;
  phone?: string;
  status?: string;
};

type CustomerApiResponse = Customer[] | { customers?: Customer[] };

function normalizeCustomers(payload: CustomerApiResponse | null): Customer[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.customers)) {
    return payload.customers;
  }

  return [];
}

function getCustomerName(customer: Customer) {
  const name = `${customer.firstName ?? ''} ${customer.lastName ?? ''}`.trim();
  return name || 'Unnamed customer';
}

export function CustomerList() {
  const [customers, setCustomers] = useState<CustomerApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setError(null);
        setLoading(true);

        const response = await fetch('/api/customers');

        if (!response.ok) {
          throw new Error(`Failed to fetch customers: ${response.statusText}`);
        }

        setCustomers(await response.json());
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : 'Unable to load customer directory.');
      } finally {
        setLoading(false);
      }
    };

    void fetchCustomers();
  }, []);

  const filteredCustomers = useMemo(() => {
    const normalized = normalizeCustomers(customers);
    const search = query.trim().toLowerCase();

    if (!search) {
      return normalized;
    }

    return normalized.filter((customer) =>
      [getCustomerName(customer), customer.email, customer.phone, customer.status]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(search)),
    );
  }, [customers, query]);

  return (
    <Card>
      <CardHeader className="gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <CardTitle>Customer directory</CardTitle>
          <CardDescription>
            Search tenant customers and verify contact details before opening a service request.
          </CardDescription>
        </div>
        <div className="w-full md:max-w-xs">
          <Input
            aria-label="Search customers"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, email, phone..."
            value={query}
          />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="rounded-xl border border-border bg-muted/40 p-6 text-sm text-muted-foreground">
            Loading customer directory...
          </div>
        ) : null}

        {error ? (
          <div className="mb-4 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        {!loading && filteredCustomers.length === 0 ? (
          <EmptyState
            description="No customer records matched the current filter. Add a customer or clear the search field."
            title="No customers found"
          />
        ) : null}

        {!loading && filteredCustomers.length > 0 ? (
          <ResponsiveTable>
            <thead>
              <tr className={tableHeadClassName}>
                <th className={tableCellClassName}>Name</th>
                <th className={tableCellClassName}>Email</th>
                <th className={tableCellClassName}>Phone</th>
                <th className={tableCellClassName}>Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCustomers.map((customer) => (
                <tr className="transition hover:bg-muted/40" key={customer.id}>
                  <td className={`${tableCellClassName} font-semibold text-foreground`}>
                    {getCustomerName(customer)}
                  </td>
                  <td className={`${tableCellClassName} text-muted-foreground`}>
                    {customer.email ?? '—'}
                  </td>
                  <td className={`${tableCellClassName} text-muted-foreground`}>
                    {customer.phone ?? '—'}
                  </td>
                  <td className={tableCellClassName}>
                    <StatusBadge tone={(customer.status ?? 'Active') === 'Pending' ? 'warning' : 'success'}>
                      {customer.status ?? 'Active'}
                    </StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </ResponsiveTable>
        ) : null}
      </CardContent>
    </Card>
  );
}

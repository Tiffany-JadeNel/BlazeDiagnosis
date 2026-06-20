import { PlusCircle } from 'lucide-react';

import { AppShell } from '@/components/common/app-shell';
import { CustomerList } from '@/components/customers';
import { Button } from '@/components/ui/button';

export default function StationCustomersPage() {
  return (
    <AppShell
      actions={
        <Button disabled variant="accent">
          <PlusCircle className="size-4" />
          Add customer
        </Button>
      }
      description="Search tenant customers, validate contact details, and prepare customer records for service intake."
      surface="station"
      title="Customers"
    >
      <CustomerList />
    </AppShell>
  );
}

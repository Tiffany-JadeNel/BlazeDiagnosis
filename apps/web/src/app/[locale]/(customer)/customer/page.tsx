import { AppShell } from '@/components/common/app-shell';
import { StatCard } from '@/components/common/stat-card';

export default function CustomerDashboardPage() {
  return (
    <AppShell title="Customer Dashboard" surface="customer">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active services" value="1" />
        <StatCard label="Quotes awaiting approval" value="1" />
        <StatCard label="Open invoices" value="0" />
        <StatCard label="Vehicles" value="2" />
      </div>
    </AppShell>
  );
}
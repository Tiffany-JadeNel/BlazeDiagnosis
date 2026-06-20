import { AppShell } from '@/components/common/app-shell';
import { PlaceholderCard } from '@/components/common/placeholder-card';

export default function Page() {
  return (
    <AppShell
      description="Customer-owned vehicle profiles and service-history entry points."
      surface="customer"
      title="Vehicles"
    >
      <PlaceholderCard
        description="This screen has been restyled and reserved for the MVP service implementation."
        title="Customer vehicles"
      />
    </AppShell>
  );
}

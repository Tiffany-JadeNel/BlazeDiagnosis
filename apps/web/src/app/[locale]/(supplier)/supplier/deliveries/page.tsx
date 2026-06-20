import { AppShell } from '@/components/common/app-shell';
import { PlaceholderCard } from '@/components/common/placeholder-card';

export default function Page() {
  return (
    <AppShell
      description="Delivery ETA, proof of delivery, courier details, and delay notes."
      surface="supplier"
      title="Supplier deliveries"
    >
      <PlaceholderCard
        description="This screen has been restyled and reserved for the MVP service implementation."
        title="Supplier deliveries"
      />
    </AppShell>
  );
}

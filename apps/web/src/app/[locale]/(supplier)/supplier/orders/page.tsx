import { AppShell } from '@/components/common/app-shell';
import { PlaceholderCard } from '@/components/common/placeholder-card';

export default function Page() {
  return (
    <AppShell
      description="Accepted parts orders awaiting dispatch, in transit, delayed, or delivered."
      surface="supplier"
      title="Supplier orders"
    >
      <PlaceholderCard
        description="This screen has been restyled and reserved for the MVP service implementation."
        title="Supplier orders"
      />
    </AppShell>
  );
}

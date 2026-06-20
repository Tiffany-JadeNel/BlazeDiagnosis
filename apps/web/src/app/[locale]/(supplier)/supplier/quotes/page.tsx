import { AppShell } from '@/components/common/app-shell';
import { PlaceholderCard } from '@/components/common/placeholder-card';

export default function Page() {
  return (
    <AppShell
      description="Supplier quote responses, availability, price, ETA, and alternative parts."
      surface="supplier"
      title="Supplier quotes"
    >
      <PlaceholderCard
        description="This screen has been restyled and reserved for the MVP service implementation."
        title="Supplier quotes"
      />
    </AppShell>
  );
}

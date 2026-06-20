import { AppShell } from '@/components/common/app-shell';
import { PlaceholderCard } from '@/components/common/placeholder-card';

export default function Page() {
  return (
    <AppShell
      description="Station-to-supplier chat threads for parts requests and delivery exceptions."
      surface="supplier"
      title="Supplier messages"
    >
      <PlaceholderCard
        description="This screen has been restyled and reserved for the MVP service implementation."
        title="Supplier messages"
      />
    </AppShell>
  );
}

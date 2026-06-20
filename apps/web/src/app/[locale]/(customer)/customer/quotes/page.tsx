import { AppShell } from '@/components/common/app-shell';
import { PlaceholderCard } from '@/components/common/placeholder-card';

export default function Page() {
  return (
    <AppShell
      description="Active, approved, and declined quote items with mobile-first approval history."
      surface="customer"
      title="Quotes"
    >
      <PlaceholderCard
        description="This screen has been restyled and reserved for the MVP service implementation."
        title="Customer quotes"
      />
    </AppShell>
  );
}

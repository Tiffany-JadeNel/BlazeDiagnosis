import { AppShell } from '@/components/common/app-shell';
import { PlaceholderCard } from '@/components/common/placeholder-card';

export default function Page() {
  return (
    <AppShell
      description="Tenant plan status, billing readiness, trials, and suspension workflows."
      surface="platform"
      title="Subscriptions"
    >
      <PlaceholderCard
        description="This screen has been restyled and reserved for the MVP service implementation."
        title="Subscriptions"
      />
    </AppShell>
  );
}

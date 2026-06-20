import { AppShell } from '@/components/common/app-shell';
import { PlaceholderCard } from '@/components/common/placeholder-card';

export default function Page() {
  return (
    <AppShell
      description="Tenant-specific rollout switches and future plan-based feature controls."
      surface="platform"
      title="Feature flags"
    >
      <PlaceholderCard
        description="This screen has been restyled and reserved for the MVP service implementation."
        title="Feature flags"
      />
    </AppShell>
  );
}

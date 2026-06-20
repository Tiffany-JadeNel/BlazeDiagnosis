import { AppShell } from '@/components/common/app-shell';
import { PlaceholderCard } from '@/components/common/placeholder-card';

export default function Page() {
  return (
    <AppShell
      description="SaaS usage, adoption, storage, and operational telemetry placeholders."
      surface="platform"
      title="Usage"
    >
      <PlaceholderCard
        description="This screen has been restyled and reserved for the MVP service implementation."
        title="Usage metrics"
      />
    </AppShell>
  );
}

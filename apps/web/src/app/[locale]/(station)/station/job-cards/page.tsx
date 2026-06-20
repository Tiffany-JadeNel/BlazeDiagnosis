import { AppShell } from '@/components/common/app-shell';
import { PlaceholderCard } from '@/components/common/placeholder-card';

export default function Page() {
  return (
    <AppShell
      description="Workshop job cards, assignments, blockers, diagnostics, and service status tracking."
      surface="station"
      title="Job cards"
    >
      <PlaceholderCard
        description="This screen has been restyled and reserved for the MVP service implementation."
        title="Job cards"
      />
    </AppShell>
  );
}

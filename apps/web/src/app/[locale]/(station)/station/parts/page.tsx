import { AppShell } from '@/components/common/app-shell';
import { PlaceholderCard } from '@/components/common/placeholder-card';

export default function Page() {
  return (
    <AppShell
      description="Parts requests, supplier responses, ETA tracking, and delivery dependency visibility."
      surface="station"
      title="Parts"
    >
      <PlaceholderCard
        description="This screen has been restyled and reserved for the MVP service implementation."
        title="Parts workflow"
      />
    </AppShell>
  );
}

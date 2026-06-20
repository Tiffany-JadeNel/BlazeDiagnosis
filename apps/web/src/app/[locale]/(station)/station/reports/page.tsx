import { AppShell } from '@/components/common/app-shell';
import { PlaceholderCard } from '@/components/common/placeholder-card';

export default function Page() {
  return (
    <AppShell
      description="Operational reports for revenue, delayed jobs, quotes, suppliers, and invoice exposure."
      surface="station"
      title="Reports"
    >
      <PlaceholderCard
        description="This screen has been restyled and reserved for the MVP service implementation."
        title="Reports"
      />
    </AppShell>
  );
}

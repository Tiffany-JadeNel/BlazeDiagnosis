import type { ReactNode } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export type StatCardProps = {
  description?: string;
  icon?: ReactNode;
  label: string;
  value: string;
};

export function StatCard({ description, icon, label, value }: StatCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex-row items-start justify-between gap-4 space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
        {icon ? <div className="text-muted-foreground">{icon}</div> : null}
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
        {description ? (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}

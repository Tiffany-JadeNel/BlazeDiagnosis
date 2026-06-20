import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type StatusBadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: 'danger' | 'neutral' | 'success' | 'warning';
};

const tones: Record<NonNullable<StatusBadgeProps['tone']>, string> = {
  danger: 'border-destructive/25 bg-destructive/10 text-destructive',
  neutral: 'border-border bg-muted text-muted-foreground',
  success: 'border-success/25 bg-success/10 text-success',
  warning: 'border-warning/25 bg-warning/10 text-warning',
};

export function StatusBadge({
  children,
  className,
  tone = 'neutral',
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold leading-none',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

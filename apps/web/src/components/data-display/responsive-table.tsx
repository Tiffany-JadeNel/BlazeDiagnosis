import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils';

type ResponsiveTableProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function ResponsiveTable({
  children,
  className,
  ...props
}: ResponsiveTableProps) {
  return (
    <div
      className={cn(
        'w-full overflow-x-auto rounded-xl border border-border bg-card',
        className,
      )}
      {...props}
    >
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        {children}
      </table>
    </div>
  );
}

export const tableHeadClassName =
  'border-b border-border bg-muted/60 text-xs font-semibold uppercase tracking-wide text-muted-foreground';

export const tableCellClassName = 'px-4 py-3 align-middle';

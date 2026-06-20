import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type PageSectionProps = {
  children: ReactNode;
  className?: string;
  description?: string;
  title?: string;
};

export function PageSection({
  children,
  className,
  description,
  title,
}: PageSectionProps) {
  return (
    <section className={cn('space-y-4', className)}>
      {title || description ? (
        <div>
          {title ? (
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}

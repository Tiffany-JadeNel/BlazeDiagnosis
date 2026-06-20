import type { ReactNode } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export type PlaceholderCardProps = {
  children?: ReactNode;
  description: string;
  title: string;
};

export function PlaceholderCard({ children, description, title }: PlaceholderCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {children ? <CardContent>{children}</CardContent> : null}
    </Card>
  );
}

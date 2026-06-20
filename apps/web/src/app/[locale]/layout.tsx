import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { ReactNode } from 'react';

import '../globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Blaze Diagnostics',
    template: '%s | Blaze Diagnostics',
  },
  description:
    'White-label diagnostics and service workflow SaaS for modern vehicle service stations.',
};

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
};

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

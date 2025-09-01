import SiteShell from '@/components/layout/site-shell';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteShell headerVariant="light">{children}</SiteShell>;
}

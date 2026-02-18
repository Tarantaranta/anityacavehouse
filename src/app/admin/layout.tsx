import type { ReactNode } from 'react';

// Admin rotaları için bağımsız layout — next-intl context gerektirmez
export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

'use client';

import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  useEffect(() => {
    if (status === 'unauthenticated') signIn();
  }, [status]);
  if (status === 'loading') return <div className="p-6">Checking access…</div>;
  return <>{children}</>;
}
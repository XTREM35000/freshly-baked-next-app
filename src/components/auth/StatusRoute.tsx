
import { ReactNode } from 'react';

interface StatusRouteProps {
  children: ReactNode;
}

export function StatusRoute({ children }: StatusRouteProps) {
  return <>{children}</>;
}

interface PublicRouteProps {
  children: ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  return <>{children}</>;
}

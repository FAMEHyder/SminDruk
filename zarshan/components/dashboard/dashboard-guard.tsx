"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { setTokens } from "@/lib/api";

/**
 * Guards every /dashboard/* route:
 * 1. Picks up `accessToken`/`refreshToken` query params from an OAuth redirect
 *    (see backend controller/auth.controller.js `oauthCallback`) and persists them.
 * 2. Redirects unauthenticated visitors to /login.
 * 3. Shows a lightweight loading state while the session is being resolved.
 */
function DashboardGuardInner({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading, reloadSession } = useAuth();
  const [handledOAuth, setHandledOAuth] = React.useState(false);

  React.useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken && refreshToken) {
      setTokens(accessToken, refreshToken);
      window.history.replaceState({}, "", window.location.pathname);
      reloadSession().finally(() => setHandledOAuth(true));
    } else {
      setHandledOAuth(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (handledOAuth && !loading && !user) {
      router.replace("/login");
    }
  }, [handledOAuth, loading, user, router]);

  if (loading || !handledOAuth || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-muted/30">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return <>{children}</>;
}

export function DashboardGuard({ children }: { children: React.ReactNode }) {
  return (
    <React.Suspense fallback={null}>
      <DashboardGuardInner>{children}</DashboardGuardInner>
    </React.Suspense>
  );
}

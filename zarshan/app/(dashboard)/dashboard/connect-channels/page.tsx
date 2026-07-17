"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { ConnectChannelsPanel } from "@/components/dashboard/connect-channels-panel";

export default function ConnectChannelsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Connect Channels</h2>
        <p className="text-sm text-muted-foreground">
          Link your social media accounts so you can create, schedule, and publish posts directly from Zarshan.
        </p>
      </div>

      <React.Suspense
        fallback={
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        }
      >
        <ConnectChannelsPanel />
      </React.Suspense>
    </div>
  );
}

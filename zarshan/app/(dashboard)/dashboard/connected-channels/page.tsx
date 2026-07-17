"use client";

import { ConnectedChannelsList } from "@/components/dashboard/connected-channels-list";

export default function ConnectedChannelsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Connected Channels</h2>
        <p className="text-sm text-muted-foreground">
          All pages and accounts you have connected. Manage them here or use them when creating posts.
        </p>
      </div>

      <ConnectedChannelsList />
    </div>
  );
}

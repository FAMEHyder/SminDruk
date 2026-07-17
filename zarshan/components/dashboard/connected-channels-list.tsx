"use client";

import * as React from "react";
import Link from "next/link";
import { Loader2, Unlink } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlatformIcon } from "@/components/platform-icon";
import { Platform } from "@/types";
import { useAuth } from "@/lib/auth-context";
import { socialAccountApi } from "@/lib/services";
import { ApiRequestError } from "@/lib/api";
import type { ApiSocialAccount } from "@/types/api";

const PLATFORM_LABELS: Record<Platform, string> = {
  facebook: "Facebook Pages",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  x: "X",
  tiktok: "TikTok",
  pinterest: "Pinterest",
  youtube: "YouTube",
  threads: "Threads",
  bluesky: "Bluesky",
  mastodon: "Mastodon",
  google_business: "Google Business",
};

export function ConnectedChannelsList() {
  const { workspace } = useAuth();
  const [accounts, setAccounts] = React.useState<ApiSocialAccount[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [disconnectingId, setDisconnectingId] = React.useState<string | null>(null);

  const loadAccounts = React.useCallback(() => {
    if (!workspace) return;
    setLoading(true);
    socialAccountApi
      .list(workspace._id)
      .then((data) => setAccounts(data.filter((account) => account.status === "connected")))
      .catch(() => setAccounts([]))
      .finally(() => setLoading(false));
  }, [workspace]);

  React.useEffect(() => {
    loadAccounts();
  }, [loadAccounts]);

  async function handleDisconnect(id: string) {
    setDisconnectingId(id);
    try {
      await socialAccountApi.disconnect(id);
      toast.success("Page disconnected.");
      loadAccounts();
    } catch (error) {
      const message = error instanceof ApiRequestError ? error.message : "Could not disconnect this page.";
      toast.error(message);
    } finally {
      setDisconnectingId(null);
    }
  }

  const grouped = React.useMemo(() => {
    const map = new Map<Platform, ApiSocialAccount[]>();
    for (const account of accounts) {
      const list = map.get(account.platform) ?? [];
      list.push(account);
      map.set(account.platform, list);
    }
    return map;
  }, [accounts]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" /> Loading connected channels...
      </div>
    );
  }

  if (accounts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">No connected channels yet.</p>
        <Button asChild className="mt-4" variant="outline">
          <Link href="/dashboard/connect-channels">Connect a channel</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {[...grouped.entries()].map(([platform, platformAccounts]) => (
        <div key={platform} className="rounded-2xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center gap-3">
            <PlatformIcon platform={platform} className="size-10" />
            <div>
              <p className="font-medium">{PLATFORM_LABELS[platform] ?? platform}</p>
              <p className="text-xs text-muted-foreground">
                {platformAccounts.length} connected page{platformAccounts.length > 1 ? "s" : ""}
              </p>
            </div>
            <Badge variant="secondary" className="ml-auto">
              Connected
            </Badge>
          </div>

          <div className="space-y-3">
            {platformAccounts.map((account) => (
              <div
                key={account._id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border p-3"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarImage src={account.avatar} />
                    <AvatarFallback>{account.accountName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{account.accountName}</p>
                    {account.category && (
                      <p className="text-xs text-muted-foreground">{account.category}</p>
                    )}
                    <p className="text-[11px] text-muted-foreground">Page ID: {account.accountId}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={disconnectingId === account._id}
                  onClick={() => handleDisconnect(account._id)}
                >
                  {disconnectingId === account._id ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <Unlink className="size-3.5" />
                  )}
                  Disconnect
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

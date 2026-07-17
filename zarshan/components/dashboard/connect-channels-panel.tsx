"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2, TrendingUp, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlatformIcon } from "@/components/platform-icon";
import { Platform } from "@/types";
import { useAuth } from "@/lib/auth-context";
import { socialAccountApi } from "@/lib/services";
import type { ApiSocialAccount } from "@/types/api";

const CONNECTABLE_PLATFORMS: { platform: Platform; label: string; live: boolean }[] = [
  { platform: "facebook", label: "Connect Facebook", live: true },
  { platform: "instagram", label: "Connect Instagram", live: false },
  { platform: "linkedin", label: "Connect LinkedIn", live: false },
  { platform: "x", label: "Connect X", live: false },
  { platform: "threads", label: "Connect Threads", live: false },
  { platform: "bluesky", label: "Connect Bluesky", live: false },
  { platform: "youtube", label: "Connect YouTube", live: false },
  { platform: "tiktok", label: "Connect TikTok", live: false },
  { platform: "mastodon", label: "Connect Mastodon", live: false },
  { platform: "pinterest", label: "Connect Pinterest", live: false },
  { platform: "google_business", label: "Connect Google Business P.", live: false },
];

export const CONNECT_CHANNELS_PATH = "/dashboard/connect-channels";

export function ConnectChannelsPanel() {
  const { user, workspace } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [accounts, setAccounts] = React.useState<ApiSocialAccount[]>([]);
  const [loadingAccounts, setLoadingAccounts] = React.useState(false);
  const [fbDialogOpen, setFbDialogOpen] = React.useState(false);

  const loadAccounts = React.useCallback(() => {
    if (!workspace) return;
    setLoadingAccounts(true);
    socialAccountApi
      .list(workspace._id)
      .then((data) => setAccounts(data))
      .catch(() => setAccounts([]))
      .finally(() => setLoadingAccounts(false));
  }, [workspace]);

  React.useEffect(() => {
    loadAccounts();
  }, [loadAccounts]);

  React.useEffect(() => {
    const fbStatus = searchParams.get("fb");
    if (!fbStatus) return;

    const mode = searchParams.get("mode");

    if (fbStatus === "connected") {
      toast.success(
        mode === "trending"
          ? "Facebook pages added to trending dataset!"
          : "Facebook pages connected for account management!"
      );
      loadAccounts();
    } else if (fbStatus === "denied") {
      toast.error("Facebook connection was cancelled.");
    } else {
      toast.error("Could not connect to Facebook. Please try again.");
    }

    router.replace(CONNECT_CHANNELS_PATH);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  function startFacebookConnect(connectMode: "trending" | "manage") {
    if (!workspace || !user) return;
    setFbDialogOpen(false);
    window.location.href = socialAccountApi.facebookConnectUrl(workspace._id, user._id, connectMode);
  }

  function handleConnect(platform: Platform) {
    if (platform !== "facebook") {
      toast.info("This platform is coming soon.");
      return;
    }
    setFbDialogOpen(true);
  }

  return (
    <>
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Connect Facebook to manage your pages or add them to the trending dataset for bulk posting by page number.
        </p>

        {loadingAccounts && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" /> Loading connected accounts...
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CONNECTABLE_PLATFORMS.map(({ platform, label, live }) => {
            const platformAccounts = accounts.filter((a) => a.platform === platform && a.status === "connected");
            return (
              <div key={platform} className="rounded-2xl border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <PlatformIcon platform={platform} className="size-10" />
                    <div>
                      <p className="text-sm font-medium">{label}</p>
                      <p className="text-xs text-muted-foreground">
                        {platformAccounts.length > 0
                          ? `${platformAccounts.length} page${platformAccounts.length > 1 ? "s" : ""} connected`
                          : "Not connected yet"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {live ? (
                      <Button variant="outline" size="sm" onClick={() => handleConnect(platform)}>
                        Connect
                      </Button>
                    ) : (
                      <Badge variant="secondary">Coming soon</Badge>
                    )}
                    {platformAccounts.length > 0 && (
                      <Button asChild variant="ghost" size="sm" className="h-auto px-0 text-xs">
                        <Link href="/dashboard/connected-channels">View pages</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Dialog open={fbDialogOpen} onOpenChange={setFbDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>How do you want to connect Facebook?</DialogTitle>
            <DialogDescription>
              Choose one option before continuing to Facebook OAuth.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <button
              type="button"
              onClick={() => startFacebookConnect("trending")}
              className="flex w-full items-start gap-3 rounded-xl border border-border p-4 text-left transition-colors hover:border-primary hover:bg-primary/5"
            >
              <TrendingUp className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <p className="font-medium">Include your account in trending dataset</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Pages save with page numbers for bulk post (from/to range) and secret key fetch.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => startFacebookConnect("manage")}
              className="flex w-full items-start gap-3 rounded-xl border border-border p-4 text-left transition-colors hover:border-primary hover:bg-primary/5"
            >
              <UserCog className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <p className="font-medium">I just want to manage my account</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Pages save normally for Create Post page selection and scheduling.
                </p>
              </div>
            </button>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setFbDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

import { Heart, MessageCircle, Repeat2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PlatformIcon } from "@/components/platform-icon";
import { SocialPost } from "@/types";
import { cn } from "@/lib/utils";

const statusStyles: Record<SocialPost["status"], string> = {
  published: "bg-emerald-500/10 text-emerald-500",
  scheduled: "bg-blue-500/10 text-blue-500",
  draft: "bg-muted text-muted-foreground",
  failed: "bg-red-500/10 text-red-500",
};

export function PostRow({ post }: { post: SocialPost }) {
  return (
    <div className="flex items-start gap-3 border-b border-border py-4 last:border-0">
      <PlatformIcon platform={post.platform} className="size-8 shrink-0" />
      <div className="flex-1">
        <p className="text-sm text-foreground/90">{post.content}</p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <Badge variant="secondary" className={cn("capitalize", statusStyles[post.status])}>
            {post.status}
          </Badge>
          {post.engagement && (
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Heart className="size-3" /> {post.engagement.likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="size-3" /> {post.engagement.comments}
              </span>
              <span className="flex items-center gap-1">
                <Repeat2 className="size-3" /> {post.engagement.shares}
              </span>
            </div>
          )}
        </div>
      </div>
      {post.image && (
        <img src={post.image} alt="" className="size-14 shrink-0 rounded-lg object-cover" />
      )}
    </div>
  );
}

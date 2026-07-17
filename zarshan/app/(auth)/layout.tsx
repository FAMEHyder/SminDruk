import Link from "next/link";
import { Star } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const avatars = [
  "https://i.pravatar.cc/80?img=47",
  "https://i.pravatar.cc/80?img=12",
  "https://i.pravatar.cc/80?img=32",
  "https://i.pravatar.cc/80?img=51",
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-primary via-fuchsia-600 to-purple-800 p-10 text-white lg:flex">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.25),transparent_55%)]" />
        <Link href="/" className="relative z-10 flex items-center gap-2 font-semibold">
          <span className="flex size-8 items-center justify-center rounded-lg bg-white/15">
            <Star className="size-4.5 fill-white" />
          </span>
          <span className="text-lg">Zarshan</span>
        </Link>

        <div className="relative z-10 max-w-md">
          <p className="text-2xl font-medium text-balance">
            &ldquo;Zarshan cut our content planning time in half. It genuinely feels like having
            an extra teammate.&rdquo;
          </p>
          <div className="mt-6 flex items-center gap-3">
            <Avatar className="size-11 border-2 border-white/30">
              <AvatarImage src="https://i.pravatar.cc/120?img=47" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold">Amelia Chen</p>
              <p className="text-xs text-white/70">Head of Social, Lumen Beauty</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex -space-x-2">
            {avatars.map((src) => (
              <Avatar key={src} className="size-8 border-2 border-white/40">
                <AvatarImage src={src} />
                <AvatarFallback>Z</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <p className="text-sm text-white/80">Join 28,000+ teams growing with Zarshan</p>
        </div>
      </div>

      <div className="relative flex flex-col">
        <div className="flex items-center justify-between p-6">
          <div className="lg:hidden">
            <Logo />
          </div>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center px-6 pb-12">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}

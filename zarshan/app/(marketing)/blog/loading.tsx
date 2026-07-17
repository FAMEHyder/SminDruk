import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/ui/container";

export default function BlogLoading() {
  return (
    <Container className="py-20">
      <div className="flex flex-col items-center gap-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-96" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-video w-full rounded-2xl" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </Container>
  );
}

import { Skeleton } from "@/components/ui/skeleton";

export function BookCardSkeleton() {
  return (
    <div>
      <Skeleton className="aspect-[2/3] rounded-lg" />
      <Skeleton className="mt-3 h-4 w-4/5" />
      <Skeleton className="mt-2 h-4 w-3/5" />
    </div>
  );
}

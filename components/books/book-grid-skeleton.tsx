import { BookCardSkeleton } from "@/components/books/book-card-skeleton";

type BookGridSkeletonProps = {
  count?: number;
};

export function BookGridSkeleton({ count = 10 }: BookGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {Array.from({ length: count }).map((_, index) => (
        <BookCardSkeleton key={index} />
      ))}
    </div>
  );
}

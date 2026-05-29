import { useGetCollectionBooks } from "@/api/queries/collection";
import { BookGrid } from "@/components/books/book-grid";
import { BookGridSkeleton } from "@/components/books/book-grid-skeleton";
import { Button } from "@/components/ui/button";
import type { Book } from "@/types/books";

type BookSearchResultsProps = {
  books: Book[];
  hasMore: boolean;
  isError: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
};

export function BookSearchResults({
  books,
  hasMore,
  isError,
  isLoading,
  onLoadMore,
}: BookSearchResultsProps) {
  const { data: collectionBooks } = useGetCollectionBooks();
  const savedBookIds =
    collectionBooks?.map((book) => book.gutenberg_book_id) ?? [];

  if (isLoading && !books.length) {
    return (
      <div className="mt-4 text-left">
        <BookGridSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="mt-4 text-left text-sm text-destructive">
        Failed to load books.
      </p>
    );
  }

  if (!books.length) {
    return (
      <p className="mt-4 text-left text-sm text-muted-foreground">
        No books found.
      </p>
    );
  }

  return (
    <div className="mt-4 text-left">
      <BookGrid books={books} savedBookIds={savedBookIds} />
      {isLoading && (
        <div className="mt-5">
          <BookGridSkeleton />
        </div>
      )}
      {hasMore && (
        <div className="mt-6 flex justify-center">
          <Button
            type="button"
            onClick={onLoadMore}
            disabled={isLoading}
            className="h-11 px-6"
          >
            {isLoading ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}
    </div>
  );
}

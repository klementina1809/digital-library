import { BookGrid } from "@/components/books/book-grid";
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
  if (isLoading && !books.length) {
    return <p className="mt-4 text-left text-sm text-muted-foreground">Loading...</p>;
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
      <BookGrid books={books} />
      {hasMore && (
        <div className="mt-6 flex justify-center">
          <Button
            type="button"
            variant="secondary"
            onClick={onLoadMore}
            disabled={isLoading}
            className="h-9"
          >
            {isLoading ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}
    </div>
  );
}

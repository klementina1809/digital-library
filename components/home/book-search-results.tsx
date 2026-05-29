import { BookCard } from "@/components/home/book-card";
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
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      {hasMore && (
        <button
          type="button"
          onClick={onLoadMore}
          disabled={isLoading}
          className="mt-4 text-sm font-medium text-primary disabled:opacity-50"
        >
          {isLoading ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}

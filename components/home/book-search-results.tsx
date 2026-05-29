import type { Book } from "@/types/books";

type BookSearchResultsProps = {
  books: Book[];
  isError: boolean;
  isLoading: boolean;
};

export function BookSearchResults({
  books,
  isError,
  isLoading,
}: BookSearchResultsProps) {
  if (isLoading) {
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
    <ul className="mt-4 space-y-2 text-left">
      {books.map((book) => (
        <li key={book.id}>
          {book.title}
          {book.authors.length > 0 && ` - ${book.authors[0].name}`}
        </li>
      ))}
    </ul>
  );
}

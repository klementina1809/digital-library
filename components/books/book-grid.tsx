import { BookCard } from "@/components/books/book-card";
import type { Book } from "@/types/books";

type BookGridProps = {
  books: Book[];
  variant?: "search" | "collection";
  savedBookIds?: number[];
};

export function BookGrid({
  books,
  variant = "search",
  savedBookIds = [],
}: BookGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          variant={variant}
          isSavedInCollection={savedBookIds.includes(book.id)}
        />
      ))}
    </div>
  );
}

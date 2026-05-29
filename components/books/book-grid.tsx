import { BookCard } from "@/components/books/book-card";
import type { Book } from "@/types/books";
import type { CollectionBook } from "@/types/collection";

type BookGridProps = {
  books: Book[];
  variant?: "search" | "collection";
  savedBookIds?: number[];
  collectionBooks?: CollectionBook[];
};

export function BookGrid({
  books,
  variant = "search",
  savedBookIds = [],
  collectionBooks = [],
}: BookGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {books.map((book) => {
        const collectionBook = collectionBooks.find(
          (item) => item.gutenberg_book_id === book.id
        );

        return (
          <BookCard
            key={book.id}
            book={book}
            variant={variant}
            isSavedInCollection={savedBookIds.includes(book.id)}
            collectionRating={collectionBook?.rating}
            collectionNote={collectionBook?.note}
          />
        );
      })}
    </div>
  );
}

"use client";

import { useGetCollectionBooks } from "@/api/queries/collection";
import { BookGrid } from "@/components/books/book-grid";
import { BookGridSkeleton } from "@/components/books/book-grid-skeleton";

export function CollectionBooks() {
  const { data, isError, isLoading } = useGetCollectionBooks();
  const books =
    data?.map((book) => ({
      id: book.gutenberg_book_id,
      title: book.title,
      alternative_title: null,
      authors: book.author
        ? [{ id: book.gutenberg_book_id, name: book.author }]
        : [],
      subjects: [],
      bookshelves: [],
      media_type: "Text",
      download_count: 0,
      issued: null,
      reading_ease_score: null,
      cover_image: book.cover_image,
    })) ?? [];

  if (isLoading) {
    return <BookGridSkeleton />;
  }

  if (isError) {
    return (
      <p className="text-sm text-destructive">
        Failed to load collection books.
      </p>
    );
  }

  if (!books.length) {
    return (
      <p className="text-sm text-muted-foreground">
        Your collection is empty.
      </p>
    );
  }

  return <BookGrid books={books} variant="collection" collectionBooks={data} />;
}

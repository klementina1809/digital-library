"use client";

import { Bookmark, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import {
  useAddBookToCollection,
  useDeleteBookFromCollection,
} from "@/api/queries/collection";
import { CollectionBookFields } from "@/components/books/collection-book-fields";
import { RemoveBookDialog } from "@/components/books/remove-book-dialog";
import type { Book } from "@/types/books";

type BookCardProps = {
  book: Book;
  variant?: "search" | "collection";
  isSavedInCollection?: boolean;
};

export function BookCard({
  book,
  variant = "search",
  isSavedInCollection = false,
}: BookCardProps) {
  const author = book.authors[0]?.name ?? "Unknown author";
  const isCollectionCard = variant === "collection";
  const [isSaved, setIsSaved] = useState(false);
  const isBookmarkActive = isSaved || isSavedInCollection;
  const { mutate: addBook, isPending: isAdding } = useAddBookToCollection();
  const { mutate: deleteBook, isPending: isDeleting } =
    useDeleteBookFromCollection();

  function handleAddToCollection() {
    setIsSaved(true);
    addBook(
      { book },
      {
        onError: () => {
          setIsSaved(false);
        },
      }
    );
  }

  function handleDeleteFromCollection() {
    setIsSaved(false);
    deleteBook(book.id);
  }

  function handleBookmarkClick() {
    handleAddToCollection();
  }

  return (
    <div className="relative">
      {!isCollectionCard && !isBookmarkActive && (
        <button
          type="button"
          onClick={handleBookmarkClick}
          disabled={isAdding || isDeleting}
          className="absolute right-2 top-2 flex size-8 cursor-pointer items-center justify-center rounded-full bg-white text-secondary shadow-sm transition-colors hover:text-secondary-dark disabled:cursor-default"
        >
          <Bookmark
            className="size-4"
            fill={isBookmarkActive ? "currentColor" : "none"}
          />
        </button>
      )}
      {!isCollectionCard && isBookmarkActive && (
        <RemoveBookDialog
          bookTitle={book.title}
          isPending={isDeleting}
          onConfirm={handleDeleteFromCollection}
        >
          <button
            type="button"
            disabled={isDeleting}
            className="absolute right-2 top-2 flex size-8 cursor-pointer items-center justify-center rounded-full bg-white text-secondary shadow-sm transition-colors hover:text-secondary-dark disabled:cursor-default"
          >
            <Bookmark className="size-4" fill="currentColor" />
          </button>
        </RemoveBookDialog>
      )}
      {isCollectionCard && (
        <RemoveBookDialog
          bookTitle={book.title}
          isPending={isDeleting}
          onConfirm={handleDeleteFromCollection}
        >
          <button
            type="button"
            disabled={isDeleting}
            className="absolute right-2 top-2 flex size-8 cursor-pointer items-center justify-center rounded-full bg-white text-primary shadow-sm transition-colors hover:text-primary-dark disabled:cursor-default"
          >
            <X className="size-4" />
          </button>
        </RemoveBookDialog>
      )}
      <div className="aspect-[2/3] overflow-hidden rounded-lg bg-primary-light">
        {book.cover_image ? (
          <Image
            src={book.cover_image}
            alt={book.title}
            width={240}
            height={360}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-4 text-center text-sm text-muted-foreground">
            No cover
          </div>
        )}
      </div>
      <h2 className="mt-3 line-clamp-2 text-sm font-semibold text-black">
        {book.title}
      </h2>
      <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
        {author}
      </p>
      {isCollectionCard && <CollectionBookFields bookTitle={book.title} />}
    </div>
  );
}

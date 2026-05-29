"use client";

import { Bookmark } from "lucide-react";
import Image from "next/image";

import type { Book } from "@/types/books";

type BookCardProps = {
  book: Book;
};

export function BookCard({ book }: BookCardProps) {
  const author = book.authors[0]?.name ?? "Unknown author";

  function handleAddToCollection() {
    console.log("Add book to collection:", book);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleAddToCollection}
        className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white text-secondary shadow-sm transition-colors hover:bg-secondary-light hover:text-secondary-dark"
      >
        <Bookmark className="size-4" />
      </button>
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
    </div>
  );
}

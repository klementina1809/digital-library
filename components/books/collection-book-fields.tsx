"use client";

import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useUpdateCollectionBook } from "@/api/queries/collection";

type CollectionBookFieldsProps = {
  bookId: number;
  initialRating?: number | null;
  initialNote?: string | null;
};

export function CollectionBookFields({
  bookId,
  initialRating,
  initialNote,
}: CollectionBookFieldsProps) {
  const [rating, setRating] = useState(initialRating ?? 0);
  const [note, setNote] = useState(initialNote ?? "");
  const noteTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { mutate: updateBook } = useUpdateCollectionBook();

  useEffect(() => {
    return () => {
      if (noteTimeout.current) {
        clearTimeout(noteTimeout.current);
      }
    };
  }, []);

  function handleRatingChange(value: number) {
    const previousRating = rating;
    setRating(value);
    updateBook(
      {
        bookId,
        rating: value,
      },
      {
        onError: () => {
          setRating(previousRating);
        },
      }
    );
  }

  function handleNoteChange(value: string) {
    setNote(value);

    if (noteTimeout.current) {
      clearTimeout(noteTimeout.current);
    }

    noteTimeout.current = setTimeout(() => {
      updateBook({
        bookId,
        note: value,
      });
    }, 500);
  }

  return (
    <div className="mt-3">
      <div className="flex w-full justify-between px-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingChange(star)}
            className="cursor-pointer text-secondary transition-colors hover:text-secondary-dark"
          >
            <Star
              className="size-5"
              fill={star <= rating ? "currentColor" : "none"}
            />
          </button>
        ))}
      </div>
      <textarea
        value={note}
        onChange={(event) => handleNoteChange(event.target.value)}
        placeholder="Notes"
        className="mt-3 min-h-20 w-full resize-none rounded-lg border border-input bg-white/70 px-3 py-2 text-sm text-muted-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:bg-white focus-visible:ring-3 focus-visible:ring-ring/50"
      />
    </div>
  );
}

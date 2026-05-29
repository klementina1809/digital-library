"use client";

import { Star } from "lucide-react";
import { useEffect, useState } from "react";

type CollectionBookFieldsProps = {
  bookTitle: string;
};

export function CollectionBookFields({ bookTitle }: CollectionBookFieldsProps) {
  const [rating, setRating] = useState(0);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!note.trim()) {
      return;
    }

    const timeout = setTimeout(() => {
      console.log(`${bookTitle} note: ${note}`);
    }, 500);

    return () => clearTimeout(timeout);
  }, [bookTitle, note]);

  function handleRatingChange(value: number) {
    setRating(value);
    console.log(`Book of name ${bookTitle} has ${value} stars`);
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
        onChange={(event) => setNote(event.target.value)}
        placeholder="Notes"
        className="mt-3 min-h-20 w-full resize-none rounded-lg border border-input bg-white/70 px-3 py-2 text-sm text-muted-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:bg-white focus-visible:ring-3 focus-visible:ring-ring/50"
      />
    </div>
  );
}

import type { Book } from "@/types/books";

export type AddCollectionBookPayload = {
  book: Book;
};

export type CollectionBook = {
  id: string;
  collection_id: string;
  gutenberg_book_id: number;
  title: string;
  author: string | null;
  cover_image: string | null;
  rating: number | null;
  note: string | null;
  created_at: string;
  updated_at: string;
};

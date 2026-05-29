export type BookSearchParams = {
  q: string;
  page: number;
  page_size: number;
};

export type BookAuthor = {
  id: number;
  name: string;
};

export type Book = {
  id: number;
  title: string;
  alternative_title: string | null;
  authors: BookAuthor[];
  subjects: string[];
  bookshelves: string[];
  media_type: string;
  download_count: number;
  issued: string | null;
  reading_ease_score: string | null;
  cover_image: string | null;
};

export type BooksResponse = {
  next: string | null;
  previous: string | null;
  results: Book[];
};

import type { BooksResponse, BookSearchParams } from "@/types/books";

export const booksEndpoints = {
  getBooks: async (params: BookSearchParams): Promise<BooksResponse> => {
    const searchParams = new URLSearchParams({
      q: params.q,
      page: String(params.page),
      page_size: String(params.page_size),
    });

    const response = await fetch(`/api/books?${searchParams.toString()}`);

    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    return response.json();
  },
};

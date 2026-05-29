import { useQuery } from "@tanstack/react-query";

import { api } from "@/api/api";
import type { BooksResponse, BookSearchParams } from "@/types/books";

export const useGetBooks = (params: BookSearchParams) => {
  return useQuery<BooksResponse>({
    queryFn: () => api.getBooks(params),
    queryKey: ["books", params],
    staleTime: 5 * 60 * 1000,
  });
};

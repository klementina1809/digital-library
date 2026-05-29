import { useInfiniteQuery } from "@tanstack/react-query";

import { api } from "@/api/api";
import type { BooksResponse, BookSearchParams } from "@/types/books";

export const useGetBooks = (params: BookSearchParams) => {
  return useInfiniteQuery<BooksResponse>({
    queryFn: ({ pageParam }) =>
      api.getBooks({
        ...params,
        page: Number(pageParam),
      }),
    initialPageParam: params.page,
    getNextPageParam: (lastPage, pages) =>
      lastPage.next ? pages.length + 1 : undefined,
    queryKey: ["books", params],
    staleTime: 5 * 60 * 1000,
  });
};

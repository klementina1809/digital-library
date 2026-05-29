import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/api/api";
import type {
  AddCollectionBookPayload,
  CollectionBook,
  UpdateCollectionBookPayload,
} from "@/types/collection";

export const useGetCollectionBooks = () => {
  return useQuery({
    queryFn: api.getCollectionBooks,
    queryKey: ["collection-books"],
  });
};

export const useAddBookToCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddCollectionBookPayload) =>
      api.addBookToCollection(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collection-books"] });
    },
  });
};

export const useDeleteBookFromCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookId: number) => api.deleteBookFromCollection(bookId),
    onMutate: async (bookId) => {
      await queryClient.cancelQueries({ queryKey: ["collection-books"] });

      const previousBooks = queryClient.getQueryData<CollectionBook[]>([
        "collection-books",
      ]);

      queryClient.setQueryData<CollectionBook[]>(["collection-books"], (books) =>
        books?.filter((book) => book.gutenberg_book_id !== bookId)
      );

      return { previousBooks };
    },
    onError: (_error, _bookId, context) => {
      queryClient.setQueryData(["collection-books"], context?.previousBooks);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collection-books"] });
    },
  });
};

export const useUpdateCollectionBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateCollectionBookPayload) =>
      api.updateCollectionBook(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collection-books"] });
    },
  });
};

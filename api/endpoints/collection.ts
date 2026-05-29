import type {
  AddCollectionBookPayload,
  CollectionBook,
} from "@/types/collection";

export const collectionEndpoints = {
  getCollectionBooks: async (): Promise<CollectionBook[]> => {
    const response = await fetch("/api/collection/books");

    if (!response.ok) {
      throw new Error("Failed to fetch collection books");
    }

    return response.json();
  },

  addBookToCollection: async (
    payload: AddCollectionBookPayload
  ): Promise<CollectionBook> => {
    const response = await fetch("/api/collection/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to add book to collection");
    }

    return response.json();
  },

  deleteBookFromCollection: async (bookId: number): Promise<void> => {
    const response = await fetch(`/api/collection/books?book_id=${bookId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete book from collection");
    }
  },
};

import { booksEndpoints } from "@/api/endpoints/books";
import { collectionEndpoints } from "@/api/endpoints/collection";

export const api = {
  ...booksEndpoints,
  ...collectionEndpoints,
};

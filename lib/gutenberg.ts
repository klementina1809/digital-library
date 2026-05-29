import type { BooksResponse, BookSearchParams } from "@/types/books";

const GUTENBERG_API_URL =
  "https://project-gutenberg-free-books-api1.p.rapidapi.com/books";
const GUTENBERG_API_HOST = "project-gutenberg-free-books-api1.p.rapidapi.com";

export async function searchGutenbergBooks(
  params: BookSearchParams
): Promise<BooksResponse> {
  const apiKey = process.env.GUTENBERG_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GUTENBERG_API_KEY");
  }

  const url = new URL(GUTENBERG_API_URL);

  url.searchParams.set("page_size", String(params.page_size));

  if (params.page > 1) {
    url.searchParams.set("page", String(params.page));
  }

  if (params.q) {
    url.searchParams.set("q", params.q);
  }

  const response = await fetch(url, {
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": GUTENBERG_API_HOST,
    },
    cache: "no-store",
  });

  return response.json();
}

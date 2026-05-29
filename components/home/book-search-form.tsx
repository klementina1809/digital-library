"use client";

import { type SyntheticEvent, useState } from "react";

import { useGetBooks } from "@/api/queries/books";
import { BookSearchResults } from "@/components/home/book-search-results";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function BookSearchForm() {
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const bookSearchParams = {
    q: submittedSearch,
    page: 1,
    page_size: 10,
  };

  const { data, fetchNextPage, hasNextPage, isError, isFetching } =
    useGetBooks(bookSearchParams);
  const books = data?.pages.flatMap((page) => page.results) ?? [];

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedSearch(search.trim());
  }

  function handleLoadMore() {
    fetchNextPage();
  }

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row mb-8"
      >
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search books"
          className="h-11 bg-white"
        />
        <Button type="submit" className="h-11 px-6">
          Search
        </Button>
      </form>
      <BookSearchResults
        books={books}
        hasMore={hasNextPage}
        isError={isError}
        isLoading={isFetching}
        onLoadMore={handleLoadMore}
      />
    </div>
  );
}

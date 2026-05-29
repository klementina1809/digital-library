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

  const { data, isError, isFetching } = useGetBooks(bookSearchParams);

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedSearch(search.trim());
  }

  return (
    <div className="w-full max-w-xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search books"
          aria-label="Search books"
          className="h-11 bg-white"
        />
        <Button type="submit" className="h-11 px-6">
          Search
        </Button>
      </form>
      <BookSearchResults
        books={data?.results ?? []}
        isError={isError}
        isLoading={isFetching}
      />
    </div>
  );
}

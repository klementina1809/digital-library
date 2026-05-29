"use client";

import { type SyntheticEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function BookSearchForm() {
  const [search, setSearch] = useState("");

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Search books:", search);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl flex-col gap-3 sm:flex-row"
    >
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
  );
}

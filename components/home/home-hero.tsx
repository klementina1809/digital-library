import { BookSearchForm } from "@/components/home/book-search-form";

export function HomeHero() {
  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-2xl flex-col items-center justify-center gap-8 text-center">
      <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">
        Digital Library
      </h1>
      <BookSearchForm />
    </section>
  );
}

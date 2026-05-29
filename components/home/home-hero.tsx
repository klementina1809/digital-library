import { BookSearchForm } from "@/components/home/book-search-form";

export function HomeHero() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-8 text-center">
      <h1 className="text-4xl font-semibold text-foreground sm:text-4xl">
        Find books for your digital library
      </h1>
      <BookSearchForm />
    </div>
  );
}

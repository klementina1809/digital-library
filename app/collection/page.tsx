import { AppNavbar } from "@/components/layout/app-navbar";
import { CollectionBooks } from "@/components/collection/collection-books";
import { requireUser } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function CollectionPage() {
  await requireUser();

  return (
    <main className="min-h-screen bg-background">
      <AppNavbar />
      <div className="mx-auto w-full max-w-6xl px-4 py-16">
        <CollectionBooks />
      </div>
    </main>
  );
}

import { AppNavbar } from "@/components/layout/app-navbar";
import { requireUser } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function CollectionPage() {
  await requireUser();

  return (
    <main className="min-h-screen bg-background">
      <AppNavbar />
    </main>
  );
}

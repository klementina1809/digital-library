import { HomeHero } from "@/components/home/home-hero";
import { LogoutButton } from "@/components/auth/logout-button";
import { requireUser } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  await requireUser();

  return (
    <main className="min-h-screen bg-background px-4 py-16">
      <div className="absolute right-4 top-4">
        <LogoutButton />
      </div>
      <HomeHero />
    </main>
  );
}

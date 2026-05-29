import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createSupabaseClient, hasSupabaseConfig } from "@/lib/supabase/client";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createSupabaseClient({
    getAll() {
      return cookieStore.getAll();
    },
    setAll(cookiesToSet) {
      try {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      } catch {}
    },
  });
}

export async function getCurrentUser() {
  if (!hasSupabaseConfig()) {
    return null;
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

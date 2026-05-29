import { redirect } from "next/navigation";

import { login } from "@/app/actions/auth";
import { AuthForm } from "@/components/auth/auth-form";
import { getCurrentUser } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <AuthForm
        action={login}
        buttonText="Login"
        footerHref="/register"
        footerText="Don't have an account?"
        footerLinkText="Register"
        title="Login"
      />
    </main>
  );
}

import { redirect } from "next/navigation";

import { register } from "@/app/actions/auth";
import { AuthForm } from "@/components/auth/auth-form";
import { getCurrentUser } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function RegisterPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <AuthForm
        action={register}
        buttonText="Create account"
        footerHref="/login"
        footerText="Already have an account?"
        footerLinkText="Login"
        title="Create account"
      />
    </main>
  );
}

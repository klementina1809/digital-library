"use server";

import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AuthFormState = {
  error: string;
};

export async function login(
  _state: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  let supabase;

  try {
    supabase = await createSupabaseServerClient();
  } catch {
    return { error: "Supabase is not configured." };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/");
}

export async function register(
  _state: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  let supabase;

  try {
    supabase = await createSupabaseServerClient();
  } catch {
    return { error: "Supabase is not configured." };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  if (data.user?.identities?.length === 0) {
    return { error: "This email is already registered." };
  }

  redirect("/confirm-email");
}

export async function logout() {
  const supabase = await createSupabaseServerClient();

  await supabase.auth.signOut();
  redirect("/login");
}

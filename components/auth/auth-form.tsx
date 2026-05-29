"use client";

import Link from "next/link";
import { useActionState } from "react";

import type { AuthFormState } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AuthFormProps = {
  action: (
    state: AuthFormState,
    formData: FormData
  ) => Promise<AuthFormState>;
  buttonText: string;
  footerHref: string;
  footerText: string;
  footerLinkText: string;
  title: string;
};

const initialState: AuthFormState = {
  error: "",
};

export function AuthForm({
  action,
  buttonText,
  footerHref,
  footerText,
  footerLinkText,
  title,
}: AuthFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
      <form action={formAction} className="mt-6 space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input id="email" name="email" type="email" required className="h-11" />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="h-11"
          />
        </div>
        {state.error && (
          <p className="text-sm text-destructive">{state.error}</p>
        )}
        <Button type="submit" disabled={isPending} className="h-11 w-full">
          {isPending ? "Loading..." : buttonText}
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        {footerText}{" "}
        <Link href={footerHref} className="font-medium text-primary">
          {footerLinkText}
        </Link>
      </p>
    </div>
  );
}

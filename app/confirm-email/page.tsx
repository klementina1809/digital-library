import Link from "next/link";

export default function ConfirmEmailPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-foreground">
          Confirm your email
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Open your email inbox and click the confirmation link to
          activate your account.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-flex text-sm font-medium text-primary"
        >
          Go to login
        </Link>
      </div>
    </main>
  );
}

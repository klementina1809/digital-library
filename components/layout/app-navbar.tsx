import Link from "next/link";

import { LogoutButton } from "@/components/auth/logout-button";
import { NavLinks } from "@/components/layout/nav-links";

export function AppNavbar() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-4 px-4 py-4 md:grid-cols-3">
        <Link
          href="/"
          className="justify-self-center text-lg font-semibold md:justify-self-start"
        >
          Digital Library
        </Link>
        <NavLinks />
        <div className="justify-self-center md:justify-self-end">
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}

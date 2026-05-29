"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavLink = {
  href: string;
  label: string;
};

const links: NavLink[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/collection",
    label: "Collection",
  },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-center gap-2">
      {links.map((link) => {
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

        return (
          <Button
            key={link.href}
            asChild
            variant="ghost"
            className={cn(
              isActive && "bg-white text-primary hover:bg-white hover:text-primary"
            )}
          >
            <Link href={link.href}>{link.label}</Link>
          </Button>
        );
      })}
    </nav>
  );
}

import { LogOut } from "lucide-react";

import { logout } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  return (
    <form action={logout}>
      <Button type="submit" variant="outline" className="gap-2">
        <LogOut className="size-4" />
        Logout
      </Button>
    </form>
  );
}

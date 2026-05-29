"use client";

import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";

import { logout } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const queryClient = useQueryClient();

  function handleSubmit() {
    queryClient.clear();
  }

  return (
    <form action={logout} onSubmit={handleSubmit}>
      <Button
        type="submit"
        variant="ghost"
        className="gap-2"
      >
        <LogOut className="size-4" />
        Logout
      </Button>
    </form>
  );
}

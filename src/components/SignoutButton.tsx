"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";

function SignoutButton() {
  return (
    <div className="fixed bottom-6 right-6">
      <Button onClick={() => signOut()} variant="ghost">
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default SignoutButton;

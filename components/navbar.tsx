'use client'

import { useState } from "react";
import { MainNav } from "@/components/main-nav";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";


export const Navbar = async () => {
  const [loading, setLoading] = useState(false)

  const handleSignOut = () => {
    setLoading(true)
    signOut({ callbackUrl: '/sign-in' })
  }

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
          <Button disabled={loading} variant="outline" onClick={handleSignOut}>
            {loading ? '...' : 'Sign Out'}
          </Button>
          {/* TODO: User button */}
        </div>
      </div>
    </div>
  );
};
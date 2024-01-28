
import React from "react";
// import { MainNav } from "@/components/main-nav";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { MainNav } from "@/components/main-nav";

export const Navbar = async () => {

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
          {/* TODO: User button */}
        </div>
      </div>
    </div>
  );
};
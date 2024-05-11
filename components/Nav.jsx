"use client"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const Nav = () => {
  const pathname = usePathname();
  const isMeetingPage = pathname.startsWith("/meeting");
  if (isMeetingPage) {
    return;
  }
  return (
    <div className="w-full h-14 flex justify-between items-center px-14 bg-background">
      <div id="logo">
        <Image width={120} height={70} src="/vercel.svg" alt="mooz_logo" />
      </div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Nav;

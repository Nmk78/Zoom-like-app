// "use client"
// import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React from "react";

// const Nav = () => {
//   const pathname = usePathname();
//   const isMeetingPage = pathname.startsWith("/meeting");
//   if (isMeetingPage) {
//     return;
//   }
//   return (
//     <div className="w-full h-14 flex justify-between items-center px-14 bg-background">
//       <Link href="/" id="logo">
//         <Image width={90} height={50} src="/mooz.svg" alt="mooz_logo" />
//       </Link>
//       <SignedOut>
//         <SignInButton />
//       </SignedOut>
//       <SignedIn>
//         <UserButton />
//       </SignedIn>
//     </div>
//   );
// };

// export default Nav;

// Nav.js
"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import DropdownNav from "./DropDownNav";

const Nav = () => {
  const pathname = usePathname();
  const isMeetingPage = pathname.startsWith("/meeting");

  if (isMeetingPage) return null;

  return (
    <div className="sticky top-0 z-50 w-full h-14 flex justify-between items-center px-4 md:px-14 bg-background">
      <Link href="/" id="logo" className="relative w-12 h-12 sm:w-10 sm:h-10">
        <Image
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src="/nowconnect.svg"
          alt="nowconnect"
          className="object-contain"
        />
      </Link>
      <div className="flex text-white items-center gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>

        <DropdownNav/>
      </div>
    </div>
  );
};

export default Nav;

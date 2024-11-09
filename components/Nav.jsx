// "use client";
// import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React from "react";
// import DropdownNav from "./DropDownNav";

// const Nav = () => {
//   const pathname = usePathname();
//   const isMeetingPage = pathname.startsWith("/meeting");

//   if (isMeetingPage) return null;

//   return (
//     <div className="sticky top-0 z-50 w-full h-14 flex justify-between items-center px-4 md:px-14 bg-background">
//       <Link href="/" id="logo" className="relative w-12 h-12 sm:w-10 sm:h-10">
//         <Image
//           fill
//           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//           src="/nowconnect.svg"
//           alt="nowconnect"
//           className="object-contain"
//         />
//       </Link>
//       <div className="flex text-white items-center gap-4">
//         <SignedOut>
//           <SignInButton />
//         </SignedOut>
//         <SignedIn>
//           <UserButton />
//         </SignedIn>

//         <DropdownNav/>
//       </div>
//     </div>
//   );
// };

// export default Nav;

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
      {/* Logo */}
      <Link href="/" id="logo" className="relative overflow-hidden flex items-center">
        {/* Logo */}
        <div className="relative w-12 h-12 sm:w-10 sm:h-10">
          <Image
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src="/nowconnect.svg"
            alt="nowconnect"
            className="object-contain"
          />
        </div>

        {/* Text beside or below logo */}
        <div className="ml-2 w-[14ch] flex-col md:flex-row items-center gap-2 md:gap-4">
          <div className="text-white text-xl animate-rolling-up md:animate-none md:flex items-center">
            {/* Visible on larger screens */}
            {/* <span className="hidden md:inline">Now Connect</span> */}
            {/* Visible on mobile */}
            <span className="inline">Now Connect</span>
          </div>
        </div>
      </Link>

      {/* Authentication Buttons */}
      <div className="flex text-white items-center gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <DropdownNav />
      </div>
    </div>
  );
};

export default Nav;

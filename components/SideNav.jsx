// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import { tabs } from "../constants/constants";
// import { usePathname } from "next/navigation";
// import { cn } from "@/lib/utils";

// export const Tab = ({ label, route, icon }) => {
//   // console.log(icon)
//   const pathname = usePathname();

//   let isActive = pathname === route;
//   const isMeetingPage = pathname.startsWith("/meeting");
//   if (isMeetingPage) {
//     return;
//   }
//   return (
//     <div
//       id="Tab"
//       className={cn(
//         "px-4 pl-6 py-3 my-3 mx-2 text-white flex justify-start items-center rounded-xl",
//         {
//           "bg-primary": isActive,
//         }
//       )}
//     >
//       <Link href={route} className="flex gap-3 lg:gap-4">
//         <Image
//           src={icon}
//           width={30}
//           height={30}
//           alt={label}
//           className="w-5 md:w-6 lg:w-8"
//         />
//         <p className="text-lg lg:text-xl font-medium lg:font-semibold">
//           {label}
//         </p>
//       </Link>
//     </div>
//   );
// };

// const SideNav = () => {
//   const pathname = usePathname();
//   const isMeetingPage = pathname.startsWith("/meeting");
//   if (isMeetingPage) {
//     return;
//   }
//   return (
//     <div
//       id="sideNav"
//       className="w-[185px] md:w-[210px] lg:w-[250px] xl:w-[260px] h-full bg-background relative pt-5 select-none"
//     >
//       {tabs.map(({ label, icon, route }, index) => {
//         return <Tab key={index} label={label} route={route} icon={icon} />;
//       })}
//     </div>
//   );
// };

// export default SideNav;


// SideNav.js

"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { tabs } from "../constants/constants"; // Ensure this path is correct
import { usePathname } from "next/navigation";

const Tab = ({ label, route, icon }) => {
  const pathname = usePathname();
  const isActive = pathname === route;

  return (
    <Link href={route}>
      <div
        className={`px-4 py-3 my-2 flex items-center rounded-xl text-white transition-colors ${
          isActive ? "bg-primary" : "bg-transparent hover:bg-gray-800"
        }`}
      >
        <Image src={icon} width={30} height={30} alt={label} className="w-5" />
        <p className="ml-3 text-lg font-medium">{label}</p>
      </div>
    </Link>
  );
};

const SideNav = () => {
  const pathname = usePathname();
  const isMeetingPage = pathname.startsWith("/meeting");

  if (isMeetingPage) return null;

  return (
    <aside className="hidden pt-[7vh] md:block w-[210px] lg:w-[250px] h-full bg-background p-4">
      {tabs.map(({ label, icon, route }, index) => (
        <Tab key={index} label={label} route={route} icon={icon} />
      ))}
    </aside>
  );
};

export default SideNav;

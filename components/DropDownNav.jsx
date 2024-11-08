"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { tabs } from "../constants/constants";

const Tab = ({ label, route, icon, closeDropdown }) => {
  const pathname = usePathname();
  const isActive = pathname === route;

  return (
    <Link href={route}>
      <div
        onClick={closeDropdown} // Close dropdown on tab click
        className={`px-4 py-3 my-2 flex items-center rounded-xl text-white transition-colors ${
          isActive ? "bg-primary" : "bg-transparent hover:bg-gray-800"
        }`}
      >
        <Image src={icon} width={24} height={24} alt={label} className="w-5" />
        <p className="ml-3 text-lg font-medium">{label}</p>
      </div>
    </Link>
  );
};

const DropdownNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close dropdown on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="relative md:hidden">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none"
      >
        <Image
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src="/icons/burgermenu.svg"
          alt="menu"
          className="object-contain"
        />
      </button>

      {/* Dropdown Content with Animation */}
      <div
        className={`absolute right-0 mt-2 w-48 bg-background rounded-lg shadow-lg p-4 z-50 transform transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        {tabs.map(({ label, icon, route }, index) => (
          <Tab
            key={index}
            label={label}
            route={route}
            icon={icon}
            closeDropdown={() => setIsOpen(false)} // Close on tab click
          />
        ))}
      </div>
    </div>
  );
};

export default DropdownNav;

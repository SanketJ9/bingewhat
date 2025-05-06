'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { RiMenu2Fill, RiCloseLine } from "react-icons/ri";
import { useSearch } from "../context/searchContext";

const navLinks = [
  { name: "Find Your Binge", href: "/findyourbinge" },
  { name: "Movies", href: "/movies" },
  { name: "TV", href: "/tv" },
  { name: "Watchlist", href: "/watchlist" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { setQuery } = useSearch();
  const pathname = usePathname();

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        setQuery(searchQuery.trim());
      }
    }, 300); 
    return () => clearTimeout(handler);
  }, [searchQuery, setQuery]);

  return (
    <header className="absolute top-0 left-0 z-100 w-full text-white">
      <div className="container max-w-7xl mx-auto h-16 px-4 flex justify-between items-center">
        <div className="flex items-center gap-4 lg:gap-12 w-full">
          <Link href="/">
            <div className="relative w-[180px] h-[45px]">
              <Image src="/logo.png" alt="Logo" fill priority />
            </div>
          </Link>

          <nav className="hidden lg:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-white text-md font-bold border-b-2 border-transparent py-1 px-2 hover:border-b-[#3cd293] transition-all duration-300 ${
                  pathname === link.href ? "border-b-[#3cd293]" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="header-search-profile flex justify-end items-center gap-4 flex-1">
            <div className="relative rounded-lg overflow-hidden border-[#3cd293] border-2 bg-[#0b3546] text-[#3cd293] flex items-center w-full max-w-md">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="search"
                className="block w-full py-2 px-4 text-sm text-gray-200 border-none outline-none bg-transparent"
                placeholder="Search Movies, TV Series..."
              />
              <IoSearch className="absolute right-3 text-xl text-[#3cd293]" />
            </div>

            <div className="hidden lg:flex items-center justify-center py-2 px-4 rounded-xl border border-[#3cd293] bg-[#0f455c] text-[#3cd293] cursor-pointer hover:bg-[#3cd293] hover:text-[#0b3546] transition-colors duration-300">
              <p>Login</p>
            </div>
          </div>
        </div>

        <button
          className="lg:hidden z-100 text-[#3cd293] ml-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <RiCloseLine className="text-3xl" /> : <RiMenu2Fill className="text-2xl" />}
        </button>
      </div>

      {isOpen && (
        <nav className="lg:hidden bg-[#0b3546] absolute top-0 left-0 h-full w-full px-4 flex flex-col gap-6 z-60">
          <div className="h-16 flex items-center">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <div className="relative w-[180px] h-[45px]">
                <Image src="/logo.png" alt="Logo" fill priority />
              </div>
            </Link>
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-3xl font-bold ${pathname === link.href ? "text-[#3cd293]" : ""}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
